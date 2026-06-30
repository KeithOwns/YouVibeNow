import os
import re

# Each lesson's source file alongside the in-document anchor it gets when compiled.
LESSONS = [
    ("lessons/Lesson_1_Application_Level_Instructions.html", "lesson-1"),
    ("lessons/Lesson_2_The_5_Part_Framework.html", "lesson-2"),
    ("lessons/Lesson_3_The_Art_of_Chunking.html", "lesson-3"),
    ("lessons/Lesson_4_Stateful_Prompting.html", "lesson-4"),
    ("lessons/Lesson_5_InfoSec_and_Prompting.html", "lesson-5"),
    ("lessons/Module_1_Capstone.html", "module-1-capstone"),
    ("lessons/Lesson_6_Packaging_Workflows.html", "lesson-6"),
    ("lessons/Lesson_7_Agentic_Delegation.html", "lesson-7"),
    ("lessons/Module_2_Capstone.html", "module-2-capstone"),
    ("lessons/Lesson_8_Dynamic_Memory_and_Self_Correction.html", "lesson-8"),
    ("lessons/Lesson_9_Continuous_Validation_and_Sandboxing.html", "lesson-9"),
    ("lessons/Lesson_10_Multi_Agent_Orchestration.html", "lesson-10"),
    ("lessons/Module_3_Capstone.html", "module-3-capstone"),
]
TOC_FILE = "Table_of_Contents.html"
OUTPUT_DIR = "Outputs"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Vibe_Coding_Masterclass.html")

# Maps each lesson's on-disk href (as written inside Table_of_Contents.html) to the in-document
# anchor it should jump to once everything is compiled into one page.
HREF_TO_ANCHOR = {f"lessons/{os.path.basename(path)}": f"#{anchor}" for path, anchor in LESSONS}


def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def extract_style(html):
    m = re.search(r"<style>(.*?)</style>", html, re.S)
    return m.group(1) if m else ""


def extract_page(html):
    """Pull the .page div's inner content out of a standalone converted HTML file."""
    m = re.search(r'<div class="page">(.*)</div>\s*</body>', html, re.S)
    if not m:
        raise ValueError("Could not find <div class=\"page\">...</div> in source HTML")
    return m.group(1)


def strip_breadcrumb(inner):
    # No nested <div> inside .breadcrumb in the established template, so a non-greedy match is safe.
    return re.sub(r'<div class="breadcrumb">.*?</div>\s*', "", inner, count=1, flags=re.S)


def strip_footer(inner):
    return re.sub(r'<div class="footer">.*?</div>\s*$', "", inner.rstrip(), flags=re.S)


def build_ebook():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    if not os.path.exists(TOC_FILE):
        print(f"Warning: {TOC_FILE} not found.")
        return

    toc_html = read(TOC_FILE)
    # The TOC and each lesson page use different component class names (.module/.lesson-list vs.
    # .step-num/.card/ul.plain/details/.exercise-prompt/etc.), and individual lessons each added
    # their own extra one-off classes on top of the shared template (e.g. Lesson 2's .weak-strong,
    # Lesson 10's .pipeline/.stage, the capstones' .checklist/.pass-card). Every lesson's style
    # block is needed, or a class added by only one lesson renders unstyled everywhere else.
    # Duplicate base rules (:root, body, .page, h1, .subtitle) across files are harmless --
    # identical values, last one simply wins.
    lesson_styles = "\n".join(
        extract_style(read(path)) for path, _ in LESSONS if os.path.exists(path)
    )
    style = extract_style(toc_html) + "\n" + lesson_styles
    toc_inner = strip_footer(strip_breadcrumb(extract_page(toc_html)))

    # Rewrite the TOC's lesson links to jump to the in-document anchor instead of a separate file.
    for href, anchor in HREF_TO_ANCHOR.items():
        toc_inner = toc_inner.replace(f'href="{href}"', f'href="{anchor}"')
    # Reference-page links (resources/...) and the repo-root link both go up one extra level
    # once this content is embedded inside Outputs/.
    toc_inner = toc_inner.replace('href="resources/', 'href="../resources/')
    toc_inner = toc_inner.replace('href="README.html"', 'href="../README.html"')

    sections = [f'<section id="toc">{toc_inner}</section>']

    for path, anchor in LESSONS:
        if not os.path.exists(path):
            print(f"Warning: {path} not found.")
            continue
        html = read(path)
        inner = extract_page(html)
        inner = strip_breadcrumb(inner)
        inner = strip_footer(inner)
        # lessons/ and Outputs/ are sibling folders at the same depth under YouVibeNow/, so the
        # lesson's own ../README.html / ../Table_of_Contents.html / ../assets/ links already
        # resolve correctly once embedded here -- no path rewriting needed for these.
        sections.append(f'<section id="{anchor}" class="page-break">{inner}</section>')

    title_page = """
  <div class="title-page">
    <h1>The Vibe Coding &amp; Stateful Prompting Masterclass</h1>
    <p>A comprehensive guide to Agentic Engineering</p>
  </div>
"""

    html_out = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Vibe Coding &amp; Stateful Prompting Masterclass</title>
<style>
{style}
  .title-page{{text-align:center;padding:4rem 0 3rem;border-bottom:1px solid var(--border);margin-bottom:2.5rem}}
  .title-page h1{{font-size:2.1rem;margin-bottom:.6rem}}
  .title-page p{{color:var(--subtle);font-style:italic}}
  .page-break{{page-break-before:always}}
  @media print {{ .page-break{{page-break-before:always}} }}
  section .page{{max-width:none}}
</style>
</head>
<body>
<div class="page" style="max-width:820px">
{title_page}
{''.join(sections)}
</div>
</body>
</html>
"""

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(html_out)

    print(f"Successfully built eBook at {OUTPUT_FILE}")


if __name__ == "__main__":
    build_ebook()

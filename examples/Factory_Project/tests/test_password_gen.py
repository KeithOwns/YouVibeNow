import unittest
import string
import sys
import os

# Add src to sys.path to import password_gen
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from password_gen import build_character_pool, generate_password

class TestPasswordGen(unittest.TestCase):
    def test_build_character_pool_all_true(self):
        pool = build_character_pool(True, True, True, True)
        self.assertIn(string.ascii_uppercase, pool)
        self.assertIn(string.ascii_lowercase, pool)
        self.assertIn(string.digits, pool)
        self.assertIn(string.punctuation, pool)

    def test_build_character_pool_mixed(self):
        pool = build_character_pool(True, False, True, False)
        self.assertIn(string.ascii_uppercase, pool)
        self.assertNotIn(string.ascii_lowercase, pool)
        self.assertIn(string.digits, pool)
        self.assertNotIn(string.punctuation, pool)

    def test_build_character_pool_all_false(self):
        pool = build_character_pool(False, False, False, False)
        self.assertEqual(pool, "")

    def test_generate_password_length(self):
        pool = build_character_pool(True, True, True, True)
        password = generate_password(16, pool)
        self.assertEqual(len(password), 16)

    def test_generate_password_too_short(self):
        pool = build_character_pool(True, True, True, True)
        with self.assertRaisesRegex(ValueError, "between 8 and 128"):
            generate_password(7, pool)

    def test_generate_password_too_long(self):
        pool = build_character_pool(True, True, True, True)
        with self.assertRaisesRegex(ValueError, "between 8 and 128"):
            generate_password(129, pool)

    def test_generate_password_empty_pool(self):
        pool = build_character_pool(False, False, False, False)
        with self.assertRaisesRegex(ValueError, "At least one character set"):
            generate_password(16, pool)

    def test_generate_password_guarantees_all(self):
        pool = build_character_pool(True, True, True, True)
        password = generate_password(16, pool)
        self.assertTrue(any(c in string.ascii_uppercase for c in password))
        self.assertTrue(any(c in string.ascii_lowercase for c in password))
        self.assertTrue(any(c in string.digits for c in password))
        self.assertTrue(any(c in string.punctuation for c in password))

    def test_generate_password_guarantees_partial(self):
        pool = build_character_pool(True, False, True, False)
        password = generate_password(16, pool)
        self.assertTrue(any(c in string.ascii_uppercase for c in password))
        self.assertFalse(any(c in string.ascii_lowercase for c in password))
        self.assertTrue(any(c in string.digits for c in password))
        self.assertFalse(any(c in string.punctuation for c in password))

if __name__ == '__main__':
    unittest.main()

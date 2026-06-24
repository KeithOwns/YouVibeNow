import secrets
import string
import argparse
import sys

def build_character_pool(upper: bool, lower: bool, digits: bool, special: bool) -> str:
    """Constructs the string of valid characters based on user preferences."""
    pool = ""
    if upper:
        pool += string.ascii_uppercase
    if lower:
        pool += string.ascii_lowercase
    if digits:
        pool += string.digits
    if special:
        pool += string.punctuation
    return pool

def generate_password(length: int, pool: str) -> str:
    """Randomly selects characters from the pool and returns the password string."""
    if not pool:
        raise ValueError("At least one character set must be selected.")
        
    if length < 8 or length > 128:
        raise ValueError("Password length must be between 8 and 128.")
        
    password_chars = []
    
    # Guarantee at least one character from each selected set
    # by checking if characters from that set exist in the pool.
    pool_set = set(pool)
    
    if pool_set.intersection(string.ascii_uppercase):
        password_chars.append(secrets.choice(string.ascii_uppercase))
    if pool_set.intersection(string.ascii_lowercase):
        password_chars.append(secrets.choice(string.ascii_lowercase))
    if pool_set.intersection(string.digits):
        password_chars.append(secrets.choice(string.digits))
    if pool_set.intersection(string.punctuation):
        password_chars.append(secrets.choice(string.punctuation))
        
    if len(password_chars) > length:
        raise ValueError("Password length is too short to satisfy character set requirements.")
        
    # Fill the rest of the required length from the pool
    for _ in range(length - len(password_chars)):
        password_chars.append(secrets.choice(pool))
        
    # Shuffle the result
    secure_random = secrets.SystemRandom()
    secure_random.shuffle(password_chars)
    
    return "".join(password_chars)

def main():
    parser = argparse.ArgumentParser(description="Generate a secure, random password.")
    parser.add_argument("--length", type=int, default=16, 
                        help="Length of the password (default: 16, min: 8, max: 128)")
    parser.add_argument("--no-upper", action="store_true", 
                        help="Disable uppercase letters in the password")
    parser.add_argument("--no-lower", action="store_true", 
                        help="Disable lowercase letters in the password")
    parser.add_argument("--no-digits", action="store_true", 
                        help="Disable digits in the password")
    parser.add_argument("--no-special", action="store_true", 
                        help="Disable special characters in the password")
    
    args = parser.parse_args()
    
    upper = not args.no_upper
    lower = not args.no_lower
    digits = not args.no_digits
    special = not args.no_special
    
    try:
        pool = build_character_pool(upper, lower, digits, special)
        password = generate_password(args.length, pool)
        print(password)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

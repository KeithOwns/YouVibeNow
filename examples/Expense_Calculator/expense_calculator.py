import csv
import os

def calculate_total_expenses(file_path):
    total = 0.0
    count = 0
    try:
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    total += float(row['Amount'])
                    count += 1
                except ValueError:
                    print(f"Warning: Could not parse amount in row: {row}")
        print(f"Total Expenses: ${total:.2f}")
        if count > 0:
            print(f"Average Expense: ${total/count:.2f}")
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, 'data', 'expenses.csv')
    calculate_total_expenses(csv_path)

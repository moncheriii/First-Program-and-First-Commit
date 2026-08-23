class BankAccount:
    """An account that will not let itself go negative."""

    def __init__(self, owner, balance=0):
        # Reject a negative opening balance
        if balance < 0:
            raise ValueError("Opening balance cannot be negative.")
        
        # Store the owner and balance privately
        self._owner = owner
        self._balance = balance

    def get_balance(self):
        # Return the current balance without exposing _balance directly
        return self._balance

    def deposit(self, amount):
        # Reject zero or negative deposit amounts
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.")
        
        # Add the amount to the stored balance
        self._balance += amount

    def withdraw(self, amount):
        # Reject zero or negative withdrawal amounts
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        
        # Reject an overdraft (withdrawing more than available)
        if amount > self._balance:
            raise ValueError("Insufficient funds: cannot withdraw more than available balance.")
        
        # Subtract from the balance
        self._balance -= amount

    def __str__(self):
        # Return string formatted as 'Owner: Balance' to two decimal places
        return f"{self._owner}: {self._balance:.2f}"


if __name__ == "__main__":
    print("BankAccount starter. Run: python test_bank_account.py")
package de.realliferpg.app.objects;

public class BankAccountDTO {
    public String pid;
    public String iban;
    public int balance;
    public int default_account;

    public BankAccountDTO() {}

    public BankAccountDTO(String pid, String iban, int balance, int default_account) {
        this.pid = pid;
        this.iban = iban;
        this.balance = balance;
        this.default_account = default_account;
    }

    public boolean isDefaultAccount() {
        return default_account == 1;
    }
}

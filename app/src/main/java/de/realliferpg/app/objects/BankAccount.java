package de.realliferpg.app.objects;

public class BankAccount extends BankAccountDTO {
    public int id;
    public int disabled;
    public String updated_at;
    public String created_at;

    public BankAccount() {
        super();
    }

    public BankAccount(int id, String pid, String iban, int balance, int default_account,int disabled, String updated_at, String created_at) {
        super(pid, iban, balance, default_account);
        this.id = id;
        this.disabled = disabled;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }

    public boolean isDisabled() {
        return disabled == 1;
    }

    public boolean isActive() {
        return disabled == 0;
    }
}

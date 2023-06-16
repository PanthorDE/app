package de.realliferpg.app.objects;

public class Phonebooks {
    public int idNR;
    public String pid;
    public PhonebookEntry[] phonebook;
    public String side;
    public String laravel_through_key;
    public PhonebookIdentity identity;
    public String updated_at;
    public String created_at;


    public Phonebooks(int _idNr, PhonebookEntry[] _phonebook){
        this.idNR = _idNr;
        this.phonebook = _phonebook;
    }
}

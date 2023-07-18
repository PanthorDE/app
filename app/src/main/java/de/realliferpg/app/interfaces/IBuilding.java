package de.realliferpg.app.interfaces;

public interface IBuilding {
    int getId();
    int getPayedForDays();
    int getPayedForHours();
    String[] getPlayers();
    int getDisabled();
    boolean isDisabled();
    boolean isActive();
    boolean equals(Object o);
}

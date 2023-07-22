package de.realliferpg.app.objects;

import de.realliferpg.app.interfaces.IBuilding;

public class HouseDTO implements IBuilding {
    public int id;
    public int payed_for;
    public int disabled;
    public String location;

    public HouseDTO() {}

    public HouseDTO(int id, int payed_for, int disabled, String location) {
        this.id = id;
        this.payed_for = payed_for;
        this.disabled = disabled;
        this.location = location;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public int getPayedForDays() {
        return payed_for / 24;
    }

    @Override
    public int getPayedForHours() {
        return payed_for;
    }

    @Override
    public String[] getPlayers() {
        return new String[0];
    }

    @Override
    public int getDisabled() {
        return disabled;
    }

    @Override
    public boolean isDisabled() {
        return disabled == 1;
    }

    public boolean isActive() {
        return disabled == 0;
    }

    public Position getPosition() {
        return new Position(location);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        HouseDTO house = (HouseDTO) obj;
        return id == house.id;
    }
}

package de.realliferpg.app.objects;

import java.util.ArrayList;
import java.util.List;

public class PlayerInfo {

    public class Wrapper{
        public PlayerInfo[] data;
        public long requested_at;
    }

    public int id;
    public String pid;
    public String guid;
    public String name;

    public int cash;
    public int bankacc;

    public String coplevel;
    public String mediclevel;
    public String adaclevel;
    public String adminlevel;
    public String donatorlvl;

    public int arrested;
    public int citizen;
    public int tutorial;
    public int dsgvo;

    public int level;
    public int exp;
    public int skillpoint;
    public int level_progress;

    public int hunger;
    public int thirst;
    public int drugs;
    public int addiction;
    public int drug_story;
    public int drug_lvl;
    public int jail_time;

    public String pos;
    public int pos_alive;
    public int pos_free;

    public int server_id;
    public String updated_at;
    public String created_at;
    public ApiDateTime last_seen;

    public String avatar;
    public String avatar_full;
    public String avatar_medium;
    public String profilename;
    public String profileurl;

    public Donation[] donations;
    public House[] houses; // Fertige Häuser
    public HouseDTO[] houses_keyed;
    public Building[] buildings; // Bauwerke
    public Building[] buildings_keyed;
    public Rental[] rentals; // Appartments
    public VehicleGroup[] vehiclesByType; // Fahrzeuge je nach Typ
    public Phones[] phones;
    public Phonebooks[] phonebooks;

    public long requested_at;

    @Override
    public String toString() {
        return "ID: " + id + " PID:" + pid + " Name: " + name;
    }

    public List<HouseDTO> getAllHouses() {
        List<HouseDTO> houses = new ArrayList<>();

        for (HouseDTO house : this.houses) {
            boolean found = false;
            for (HouseDTO h : houses) {
                if (h.equals(house)) {
                    found = true;
                    break;
                }
            }

            if (!found) houses.add(house);
        }

        for (HouseDTO house : this.houses_keyed) {
            boolean found = false;
            for (HouseDTO h : houses) {
                if (h.equals(house)) {
                    found = true;
                    break;
                }
            }

            if (!found) houses.add(house);
        }

        return houses;
    }

    public List<HouseDTO> getActiveHouses() {
        List<HouseDTO> allHouses = this.getAllHouses();
        List<HouseDTO> activeHouses = new ArrayList<>();

        for (HouseDTO house : allHouses) {
            if (house.isActive()) activeHouses.add(house);
        }

        return activeHouses;
    }

    public List<BuildingDTO> getAllBuildings() {
        List<BuildingDTO> buildings = new ArrayList<>();

        for (BuildingDTO building : this.buildings) {
            boolean found = false;
            for (BuildingDTO b : buildings) {
                if (b.equals(building)) {
                    found = true;
                    break;
                }
            }

            if (!found) buildings.add(building);
        }

        for (BuildingDTO building : this.buildings_keyed) {
            boolean found = false;
            for (BuildingDTO b : buildings) {
                if (b.equals(building)) {
                    found = true;
                    break;
                }
            }

            if (!found) buildings.add(building);
        }

        return buildings;
    }

    public List<BuildingDTO> getActiveBuildings() {
        List<BuildingDTO> allBuildings = this.getAllBuildings();
        List<BuildingDTO> activeBuildings = new ArrayList<>();

        for (BuildingDTO building : allBuildings) {
            if (building.isActive()) activeBuildings.add(building);
        }

        return activeBuildings;
    }
}

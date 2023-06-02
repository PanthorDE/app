package de.realliferpg.app.objects;

import de.realliferpg.app.interfaces.BuildingEnum;
import de.realliferpg.app.interfaces.IBuilding;

public class ChoosenMaintenanceBuilding {
    private BuildingEnum type;
    private IBuilding building;

    public ChoosenMaintenanceBuilding(BuildingEnum _type, IBuilding _building) {
        this.type = _type;
        this.building = _building;
    }

    public void setType(BuildingEnum _type) {
        this.type = _type;
    }

    public BuildingEnum getType() {
        return this.type;
    }

    public void setBuilding(IBuilding _building) {
        this.building = _building;
    }

    public IBuilding getBuilding() {
        return this.building;
    }
}

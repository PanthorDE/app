package de.realliferpg.app.helper;

import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;

import de.realliferpg.app.Constants;
import de.realliferpg.app.Singleton;
import de.realliferpg.app.interfaces.RequestCallbackInterface;
import de.realliferpg.app.interfaces.RequestTypeEnum;
import de.realliferpg.app.interfaces.VehicleEnum;
import de.realliferpg.app.objects.Changelog;
import de.realliferpg.app.objects.CompanyShops;
import de.realliferpg.app.objects.MarketServerObject;
import de.realliferpg.app.objects.PlayerInfo;
import de.realliferpg.app.objects.Server;
import de.realliferpg.app.objects.Shop;
import de.realliferpg.app.objects.ShopItem;
import de.realliferpg.app.objects.ShopVehicle;
import de.realliferpg.app.objects.Vehicle;
import de.realliferpg.app.objects.VehicleGroup;
import de.realliferpg.app.objects.VehiclesInfo;

public class ApiHelper {

    private RequestCallbackInterface callbackInterface;
    private PreferenceHelper preferenceHelper;

    public ApiHelper(RequestCallbackInterface callbackInterface){
        this.callbackInterface = callbackInterface;
        preferenceHelper = new PreferenceHelper();
    }

    public boolean handleResponse(RequestTypeEnum type, JSONObject response){
        Gson gson = new Gson();

        switch (type){
            case PLAYER:
                PlayerInfo.Wrapper playerWrapper = gson.fromJson(response.toString(), PlayerInfo.Wrapper.class);
                PlayerInfo playerInfo = playerWrapper.data[0];
                playerInfo.requested_at = playerWrapper.requested_at;
                Singleton.getInstance().setPlayerInfo(playerInfo);
                return true;
            case PLAYER_VEHICLES:
                VehiclesInfo.Wrapper vehiclesInfoWrapper = gson.fromJson(response.toString(), VehiclesInfo.Wrapper.class);
                Vehicle[] vehicles = vehiclesInfoWrapper.data;
                PlayerInfo playerInfoSecond = Singleton.getInstance().getPlayerInfo();
                if (playerInfoSecond != null)
                {
                    playerInfoSecond.vehiclesByType = this.SortVehiclesByType(vehicles);
                    Singleton.getInstance().setPlayerInfo(playerInfoSecond);
                }
                return true;
            case SERVER:
                Server.Wrapper serverWrapper = gson.fromJson(response.toString(), Server.Wrapper.class);
                final ArrayList<Server> servers = new ArrayList<>(Arrays.asList(serverWrapper.data));
                Singleton.getInstance().setServerList(servers);
                return true;
            case SERVER_LOGS:
                // TODO
                return true;
            case CHANGELOG:
                Changelog.Wrapper value = gson.fromJson(response.toString(), Changelog.Wrapper.class);
                final ArrayList<Changelog> changelogs = new ArrayList<>(Arrays.asList(value.data));
                Singleton.getInstance().setChangelogList(changelogs);
                return true;
            case CURRENT_MARKET_PRICES:
                MarketServerObject.Wrapper marketItemWrapper = gson.fromJson(response.toString(), MarketServerObject.Wrapper.class);
                final ArrayList<MarketServerObject> marketServerObjects = new ArrayList<>(Arrays.asList(marketItemWrapper.data));
                Singleton.getInstance().setMarketItemList(marketServerObjects);
                return true;
            case SHOP:
                Shop.Wrapper shop = gson.fromJson(response.toString(), Shop.Wrapper.class);
                final ArrayList<Shop> shops = new ArrayList<>(Arrays.asList(shop.data));
                Singleton.getInstance().setShopList(shops);
                return true;
            case SHOP_INFO_ITEM:
                ShopItem.Wrapper shopWrapper = gson.fromJson(response.toString(), ShopItem.Wrapper.class);
                final ArrayList<ShopItem> shopEntries = new ArrayList<>(Arrays.asList(shopWrapper.data));
                Singleton.getInstance().setShopItemList(shopEntries);
                return true;
            case SHOP_INFO_VEHICLE:
                ShopVehicle.Wrapper vehicleWrapper = gson.fromJson(response.toString(), ShopVehicle.Wrapper.class);
                final ArrayList<ShopVehicle> shopVehicles = new ArrayList<>(Arrays.asList(vehicleWrapper.data));
                Singleton.getInstance().setShopVehicleList(shopVehicles);
                return true;
            case COMPANY_SHOPS:
                CompanyShops.Wrapper companyShopsWrapper = gson.fromJson(response.toString(), CompanyShops.Wrapper.class);
                final ArrayList<CompanyShops> companyShops = new ArrayList<>(Arrays.asList(companyShopsWrapper.data));
                Singleton.getInstance().setCompanyShopsData(companyShops);
                return true;
            case NETWORK_ERROR:
                return true;
        }

        return false;
    }

    private VehicleGroup[] SortVehiclesByType(Vehicle[] vehicles) {
        VehicleGroup vehicleGroupCar = new VehicleGroup();
        vehicleGroupCar.type = VehicleEnum.CAR;
        vehicleGroupCar.vehicles = new ArrayList<Vehicle>();
        VehicleGroup vehicleGroupShip = new VehicleGroup();
        vehicleGroupShip.type = VehicleEnum.SHIP;
        vehicleGroupShip.vehicles = new ArrayList<Vehicle>();
        VehicleGroup vehicleGroupPlane = new VehicleGroup();
        vehicleGroupPlane.type = VehicleEnum.AIR;
        vehicleGroupPlane.vehicles = new ArrayList<Vehicle>();

        for (Vehicle veh : vehicles) {
            if (veh.vehicle_data.name.toLowerCase().contains("quest") || veh.alive == -1 || !showVehicle(veh))
                continue;

            switch (veh.type.toLowerCase()){
                case "car":
                    vehicleGroupCar.vehicles.add(veh);
                    break;
                case "air":
                    vehicleGroupPlane.vehicles.add(veh);
                    break;
                case "ship":
                    vehicleGroupShip.vehicles.add(veh);
                    break;
            }
        }

        return new VehicleGroup[]{vehicleGroupCar, vehicleGroupPlane, vehicleGroupShip};
    }

    private boolean showVehicle(Vehicle veh){
        boolean showVehicle = false;

        if (veh.impound == 1 && preferenceHelper.showImpounded()) // beschlagnahmt == 1
        {
            showVehicle = true;
        }
        else if (veh.disabled == 1 && preferenceHelper.showDestroyed()) // zerstört == 1
        {
            showVehicle = true;
        }
        else if (veh.alive == 1 && veh.impound == 0 && veh.disabled == 0) {
            showVehicle = true;
        }

        return showVehicle;
    }

    private boolean checkCache(Class<?> type){
        long sysTime = (int) (System.currentTimeMillis() / 1000L);

        if(type.equals(PlayerInfo.class)){
            PlayerInfo playerInfo = Singleton.getInstance().getPlayerInfo();
            return playerInfo != null && (sysTime - playerInfo.requested_at) < 30; // TODO define cache intervals somewhere
        }

        return false;
    }

    public void getChangelog() {
        NetworkHelper networkHelper = new NetworkHelper();
        networkHelper.doJSONRequest(Constants.URL_CHANGELOG,callbackInterface,RequestTypeEnum.CHANGELOG);
    }

    public void getServers() {
        NetworkHelper networkHelper = new NetworkHelper();
        networkHelper.doJSONRequest(Constants.URL_SERVER,callbackInterface,RequestTypeEnum.SERVER);
    }

    public void getPlayerStats() {
        NetworkHelper networkHelper = new NetworkHelper();

        String secret = preferenceHelper.getPlayerAPIToken();

        networkHelper.doJSONRequest(Constants.URL_PLAYERSTATS + secret,callbackInterface,RequestTypeEnum.PLAYER);
    }

    public void getShops(int shopType) {
        NetworkHelper networkHelper = new NetworkHelper();

        if(shopType == Constants.CATEGORY_SHOP){
            networkHelper.doJSONRequest(Constants.URL_SHOPTYPES_ITEMS,callbackInterface,RequestTypeEnum.SHOP);
        }else if(shopType == Constants.CATEGORY_VEHICLE){
            networkHelper.doJSONRequest(Constants.URL_SHOPTYPES_VEHICLES,callbackInterface,RequestTypeEnum.SHOP);
        }
    }

    public void getShopInfo(int shopType,String shop) {
        NetworkHelper networkHelper = new NetworkHelper();

        if(shopType == Constants.CATEGORY_SHOP){
            networkHelper.doJSONRequest(Constants.URL_SHOP_ITEMS + shop,callbackInterface,RequestTypeEnum.SHOP_INFO_ITEM);
        }else if(shopType == Constants.CATEGORY_VEHICLE){
            networkHelper.doJSONRequest(Constants.URL_SHOP_VEHICLES + shop,callbackInterface,RequestTypeEnum.SHOP_INFO_VEHICLE);
        }
    }

    public void getPlayersList() {
        NetworkHelper networkHelper = new NetworkHelper();
        networkHelper.doJSONRequest(Constants.URL_SERVER,callbackInterface,RequestTypeEnum.SERVER);
    }

    public void getMarketPrices() {
        NetworkHelper networkHelper = new NetworkHelper();
        networkHelper.doJSONRequest(Constants.URL_MARKETPRICES,callbackInterface,RequestTypeEnum.CURRENT_MARKET_PRICES);
    }


    public void getPlayerVehicles() {
        NetworkHelper networkHelper = new NetworkHelper();
        String secret = preferenceHelper.getPlayerAPIToken();
        networkHelper.doJSONRequest(Constants.URL_PLAYERSTATS + secret + "/vehicles",callbackInterface,RequestTypeEnum.PLAYER_VEHICLES);
    }

    public void getCompanyShop(){
        NetworkHelper networkHelper = new NetworkHelper();
        networkHelper.doJSONRequest(Constants.URL_SHOPS_COMPANYS, callbackInterface, RequestTypeEnum.COMPANY_SHOPS);
    }
}

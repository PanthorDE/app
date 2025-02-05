package de.realliferpg.app;

import android.content.Context;
import com.google.android.material.snackbar.Snackbar;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;

import de.realliferpg.app.objects.Changelog;
import de.realliferpg.app.objects.CompanyShops;
import de.realliferpg.app.objects.CustomNetworkError;
import de.realliferpg.app.objects.MarketItem;
import de.realliferpg.app.objects.MarketServerObject;
import de.realliferpg.app.objects.PlayerInfo;
import de.realliferpg.app.objects.Server;
import de.realliferpg.app.objects.Shop;
import de.realliferpg.app.objects.ShopItem;
import de.realliferpg.app.objects.ShopVehicle;

public class Singleton {
    private static final Singleton instance = new Singleton();

    public static Singleton getInstance() {
        return instance;
    }

    private Singleton() {
    }

    private RequestQueue volleyQueue;
    private Context context;

    private Snackbar currentSnackbar;

    private PlayerInfo playerInfo;
    private ArrayList<Server> serverList;
    private ArrayList<Changelog> changelogList;
    private ArrayList<Shop> shopList;
    private ArrayList<ShopVehicle> shopVehicleList;
    private ArrayList<ShopItem> shopItemList;
    private ArrayList<MarketServerObject> marketServerObjects;
    private ArrayList<CompanyShops> companyShops;

    private CustomNetworkError networkError;

    private String scanResponse;
    private String errorMsg;

    private RequestQueue getRequestQueue() {
        if (volleyQueue == null) {
            // getApplicationContext() is key, it keeps you from leaking the
            // Activity or BroadcastReceiver if someone passes one in.
            volleyQueue = Volley.newRequestQueue(context.getApplicationContext());
        }
        return volleyQueue;
    }

    public <T> void addToRequestQueue(Request<T> req) {
        getRequestQueue().add(req);
    }


    public void setContext(Context context) {
        this.context = context;
    }

    public Context getContext (){return this.context;}

    public PlayerInfo getPlayerInfo() {
        return playerInfo;
    }

    public void setPlayerInfo(PlayerInfo playerInfo) {
        this.playerInfo = playerInfo;
    }

    public String getScanResponse() {
        if(scanResponse == null){
            scanResponse = "";
        }
        return scanResponse;
    }

    public void setScanResponse(String scanResponse) {
        this.scanResponse = scanResponse;
    }

    public String getErrorMsg() {
        if(scanResponse == null){
            scanResponse = context.getString(R.string.str_no_msg);
        }
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public void setCurrentSnackbar(Snackbar currentSnackbar) {
        this.currentSnackbar = currentSnackbar;
    }

    public void dismissSnackbar(){
        if(currentSnackbar != null){
            currentSnackbar.dismiss();
        }
    }

    public ArrayList<Server> getServerList() {
        return serverList;
    }

    public void setServerList(ArrayList<Server> serverList) {
        this.serverList = serverList;
    }

    public ArrayList<Changelog> getChangelogList() {
        return changelogList;
    }

    public void setChangelogList(ArrayList<Changelog> changelogList) {
        this.changelogList = changelogList;
    }

    public ArrayList<Shop> getShopList() {
        return shopList;
    }

    public void setShopList(ArrayList<Shop> shopList) {
        this.shopList = shopList;
    }

    public ArrayList<ShopVehicle> getShopVehicleList() {
        return shopVehicleList;
    }

    public void setShopVehicleList(ArrayList<ShopVehicle> shopVehicleList) {
        this.shopVehicleList = shopVehicleList;
    }

    public ArrayList<ShopItem> getShopItemList() {
        return shopItemList;
    }

    public void setShopItemList(ArrayList<ShopItem> shopItemList) {
        this.shopItemList = shopItemList;
    }



    public ArrayList<CompanyShops> getCompanyShopsData(){ return companyShops; }
    public void setCompanyShopsData(ArrayList<CompanyShops> companyShops) {
        this.companyShops = companyShops;
    }

    public CustomNetworkError getNetworkError() {
        return networkError;
    }

    public void setNetworkError(CustomNetworkError networkError) {
        this.networkError = networkError;
    }

    public ArrayList<MarketItem> getMarketPrices() {
        ArrayList<MarketItem> marketItems = new ArrayList<MarketItem>();

        MarketServerObject dataServer1 =  this.marketServerObjects.get(0);
        MarketServerObject dataServer2 = null;
        if (this.marketServerObjects.size() > 1)
            dataServer2 =  this.marketServerObjects.get(2);
        MarketServerObject dataServer3 = null;
        if (this.marketServerObjects.size() > 2)
            dataServer3 =  this.marketServerObjects.get(2);

        int counter = 0;

        for (MarketServerObject.Item item : dataServer1.market) {
            MarketItem temp = new MarketItem();
            temp.classname = item.item;
            temp.created_at = item.created_at;
            temp.name = item.localized;
            temp.priceServer1 = item.price;
            // Um nicht zwei foreach-Schleifen zu gehen, wird durch den Counter auf das entsprechende Element aus den Daten von Server 2 & 3 zugegriffen
            // Wenn neue Items hinzugefügt werden, dann kann es sein, dass Server 2 die Änderungen hat, Server 3 aber nicht -> für den dann nicht weiter durch die Liste iterieren
            if (dataServer2 != null && dataServer2.market.length > counter) {
                temp.priceServer2 = dataServer2.market[counter].price;
            }
            if (dataServer3 != null && dataServer3.market.length > counter) {
                temp.priceServer3 = dataServer3.market[counter].price;
            }
            temp.updated_at = item.updated_at;
            counter++;
            marketItems.add(temp);
        }

        return marketItems;
    }

    public void setMarketItemList(ArrayList<MarketServerObject> marketServerObjects) {
        this.marketServerObjects = marketServerObjects;
    }
}

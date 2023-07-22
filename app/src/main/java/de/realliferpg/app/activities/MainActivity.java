package de.realliferpg.app.activities;

import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import androidx.annotation.NonNull;
import com.google.android.material.navigation.NavigationView;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;
import androidx.appcompat.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.util.Objects;

import de.realliferpg.app.R;
import de.realliferpg.app.Singleton;
import de.realliferpg.app.fragments.*;
import de.realliferpg.app.helper.ApiHelper;
import de.realliferpg.app.helper.PreferenceHelper;
import de.realliferpg.app.interfaces.*;
import de.realliferpg.app.objects.PlayerInfo;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, FragmentInteractionInterface, RequestCallbackInterface {

    private Fragment currentFragment;
    boolean doubleBackToExitPressedOnce = false;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Singleton.getInstance().setContext(getApplicationContext());
        PreferenceHelper preferenceHelper = new PreferenceHelper();

        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = findViewById(R.id.layout_main);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        navigationView.getMenu().getItem(0).setChecked(true);

        // Load Main fragment
        if (preferenceHelper.getPlayerAPIToken().equals("")) {
            switchFragment(new SettingsFragment());

            AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
            alertDialog.setTitle(getString(R.string.str_noApiToken));
            alertDialog.setMessage(getString(R.string.str_noApiTokenInfo));
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
            alertDialog.show();
        } else {
            switchFragment(new MainFragment());
        }

        View header = navigationView.getHeaderView(0);
        ImageButton imageButton = header.findViewById(R.id.ib_nav_scanCode);
        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SettingsFragment settingsFragment = new SettingsFragment();
                switchFragment(settingsFragment);
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            finish();
            return;
        }

        this.doubleBackToExitPressedOnce = true;
        Toast.makeText(this, R.string.str_back_again_to_exit, Toast.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {

            @Override
            public void run() {
                doubleBackToExitPressedOnce=false;
            }
        }, 2000);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        switch (id) {
            case R.id.nav_imprint:
                switchFragment(new ImprintFragment());
                break;
            case R.id.nav_changelog:
                switchFragment(new ChangelogFragment());
                break;
            case R.id.nav_overview:
                switchFragment(new MainFragment());
                break;
            case R.id.nav_info:
                switchFragment(new InfoFragment());
                break;
            case R.id.nav_player:
                switchFragment(new PlayerFragment());
                break;
            case R.id.nav_playerslist:
                switchFragment(new PlayersListFragment());
                break;
            case R.id.nav_marketprices:
                switchFragment(new MarketFragment());
                break;
            case R.id.nav_settings:
                switchFragment(new SettingsFragment());
                break;
            case R.id.nav_phonebook:
                switchFragment(new PhonebookFragment());
                break;
            case R.id.nav_companyshops:
                switchFragment(new CompanyShopsFragment());
                break;
            case R.id.nav_website: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.panthor.de"));
                startActivity(browserIntent);
                break;
            }
            case R.id.nav_forum: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://forum.panthor.de"));
                startActivity(browserIntent);
                break;
            }
            case R.id.nav_twitter: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://twitter.com/PanthorDE"));
                startActivity(browserIntent);
                break;
            }
            case R.id.nav_discord: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://discord.com/invite/Hf3XeAyn4h"));
                startActivity(browserIntent);
                break;
            }
            case R.id.nav_polDashboard: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://polizei.panthor.de/"));
                startActivity(browserIntent);
                break;
            }
            case R.id.nav_racDashboard: {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://rac-panel.de/"));
                startActivity(browserIntent);
                break;
            }
        }
        return true;
    }

    public void switchFragment(Fragment newFragment) {

        NavigationView navigationView = findViewById(R.id.nav_view);

        if (newFragment instanceof SettingsFragment) {
            navigationView.setCheckedItem(R.id.nav_settings);
        } else if (newFragment instanceof ErrorFragment) {
            for (int i = 0; i < navigationView.getMenu().size(); i++) {
                navigationView.getMenu().getItem(i).setChecked(false);
            }
        }

        Singleton.getInstance().dismissSnackbar();

        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();

        transaction.replace(R.id.include_main_content, newFragment);

        boolean addToBack = true;

        if (currentFragment == null && newFragment instanceof MainFragment) {
            addToBack = false;
        }

        if (addToBack) {
            transaction.addToBackStack(null);
        }
        transaction.commit();

        DrawerLayout drawer = findViewById(R.id.layout_main);
        drawer.closeDrawer(GravityCompat.START);
        currentFragment = newFragment;
    }

    @Override
    public void onFragmentInteraction(Class type, Uri uri) {

        switch (uri.toString()) {
            case "open_settings":
                switchFragment(new SettingsFragment());
                break;
            case "open_error":
                switchFragment(new ErrorFragment());
                break;
            case "update_login_state":
                PlayerInfo playerInfo = Singleton.getInstance().getPlayerInfo();

                ImageView ivProfilePic = findViewById(R.id.iv_nav_icon);
                TextView tvInfo = findViewById(R.id.tv_nav_info);
                TextView tvHead = findViewById(R.id.tv_nav_head);

                Picasso.get().load(playerInfo.avatar_full).into(ivProfilePic);
                tvHead.setText(R.string.str_logged_in);
                tvInfo.setText(playerInfo.name);

                NavigationView navigationView = findViewById(R.id.nav_view);
                if (playerInfo != null) {
                    if (Integer.parseInt(playerInfo.coplevel) >= 1) {
                        navigationView.getMenu().findItem(R.id.nav_polDashboard).setVisible(true);
                    } else if (Integer.parseInt(playerInfo.adaclevel) >= 1) {
                        navigationView.getMenu().findItem(R.id.nav_racDashboard).setVisible(true);
                    }
                }
                break;
        }

        if (type.equals(PlayerFragment.class)) {
            switch (uri.toString()) {
                case "fragment_player_change_to_stats": {
                    changePlayerFragment(new PlayerStatsFragment());
                    break;
                }
                case "fragment_player_change_to_donation": {
                    changePlayerFragment(new PlayerDonationFragment());
                    break;
                }
                case "fragment_player_change_to_buildings": {
                    changePlayerFragment(new PlayerBuildingsFragment());
                    break;
                }
                case "fragment_player_change_to_vehicles": {
                    changePlayerFragment(new PlayerVehiclesFragment());
                    break;
                }
            }
        }
    }

    void changePlayerFragment(Fragment fragment) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.include_player_content, fragment);
        transaction.commit();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (data != null) {
            if (data.getAction().equals("com.google.zxing.client.android.SCAN")) {
                IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
                if (result != null) {
                    Singleton.getInstance().setScanResponse(result.getContents());
                    if(currentFragment instanceof SettingsFragment){
                        ((SettingsFragment) currentFragment).onFragmentInteraction(MainActivity.class, Uri.parse("scan_response"));
                    }

                    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
                    SharedPreferences.Editor editor = preferences.edit();
                    editor.putString("pref_api_token", result.getContents());
                    editor.apply();
                }
            }
        }
    }

    @Override
    public void onResponse(RequestTypeEnum type, JSONObject response) {
        try{
            ApiHelper apiHelper = new ApiHelper(this);
            boolean result = apiHelper.handleResponse(type,response);

            if(result){
                ((CallbackNotifyInterface) currentFragment).onCallback(type);
            }else{
                // TODO handle this case, should not happen but you never know
            }
        }catch (Exception e){
            Singleton.getInstance().setErrorMsg(e.getMessage());
            switchFragment(new ErrorFragment());
        }
    }

    public void setAppBarTitle(String title) {
        Objects.requireNonNull(getSupportActionBar())
                .setTitle(title);
    }

    public void setAppBarTitle(int resourceId) {
        Resources res = getResources();
        String title = res.getString(resourceId);
        Objects.requireNonNull(getSupportActionBar()).setTitle(title);
    }
}

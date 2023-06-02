package de.realliferpg.app.fragments;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.fragment.app.Fragment;

import android.provider.CalendarContract;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.util.ArrayUtils;
import com.google.android.material.snackbar.Snackbar;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Objects;
import java.util.OptionalInt;

import de.realliferpg.app.R;
import de.realliferpg.app.Singleton;
import de.realliferpg.app.adapter.BuildingsListAdapter;
import de.realliferpg.app.helper.PreferenceHelper;
import de.realliferpg.app.interfaces.BuildingEnum;
import de.realliferpg.app.interfaces.FragmentInteractionInterface;
import de.realliferpg.app.objects.Building;
import de.realliferpg.app.objects.BuildingGroup;
import de.realliferpg.app.objects.House;
import de.realliferpg.app.objects.PlayerInfo;
import de.realliferpg.app.objects.Rental;

public class PlayerBuildingsFragment extends Fragment {

    private View view;
    private FragmentInteractionInterface mListener;
    private BuildingGroup[] buildingByType;

    public PlayerBuildingsFragment() {
        // Required empty public constructor
    }

    public static PlayerBuildingsFragment newInstance() {
        return new PlayerBuildingsFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_player_buildings, container, false);

        if(Singleton.getInstance().getPlayerInfo() == null){
            Singleton.getInstance().setErrorMsg("PlayerBuildingsFragment Error Code #1");
            mListener.onFragmentInteraction(PlayerBuildingsFragment.class, Uri.parse("open_error"));
        }else {
            showPlayerInfo();
        }

        return view;
    }

    public void showPlayerInfo(){
        final ExpandableListView expandableListView = view.findViewById(R.id.elv_buildings);
        final TextView tvKeineDaten = view.findViewById(R.id.tvKeineDatenBuildings);

        PlayerInfo playerInfo = Singleton.getInstance().getPlayerInfo();
        House[] houses = playerInfo.houses;
        Building[] buildings = playerInfo.buildings;
        Rental[] rentals = playerInfo.rentals;

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            Building[] buildings1 = Arrays
                    .stream(buildings)
                    .filter(building -> building.stage > 0)
                    .toArray(Building[]::new);
        } else {
            Building[] buildingsWithoutStageMinusOne = buildings.clone();
            int counter = 0;
            for (Building b : buildings) {
                if (b.stage < 0){
                    counter++;
                    buildingsWithoutStageMinusOne = ArrayUtils.removeAll(buildings, b);
                }
            }
            buildings = counter == buildings.length
                    ? new Building[0]
                    : buildingsWithoutStageMinusOne.clone();
        }

        buildingByType = new BuildingGroup[3];

        buildingByType[0] = new BuildingGroup();
        buildingByType[1] = new BuildingGroup();
        buildingByType[2] = new BuildingGroup();

        buildingByType[0].type = BuildingEnum.HOUSE;
        buildingByType[0].buildings = houses;
        buildingByType[1].type = BuildingEnum.RENTAL;
        buildingByType[1].buildings = rentals;
        buildingByType[2].type = BuildingEnum.BUILDING;
        buildingByType[2].buildings = buildings;

        PreferenceHelper prefHelper = new PreferenceHelper();
        BuildingsListAdapter buildingsListAdapter = new BuildingsListAdapter(this.getContext(), buildingByType, prefHelper.getDaysForReminderMaintenance());
        expandableListView.setAdapter(buildingsListAdapter);

        Button btnReminder = view.findViewById(R.id.btn_reminder);

        if ((playerInfo.houses == null || playerInfo.houses.length == 0)
                && (playerInfo.buildings == null || playerInfo.buildings.length == 0)
                && (playerInfo.rentals == null || playerInfo.rentals.length == 0)) {
            tvKeineDaten.setVisibility(View.VISIBLE);
            expandableListView.setVisibility(View.INVISIBLE);
            btnReminder.setVisibility(View.INVISIBLE);
        } else {
            tvKeineDaten.setVisibility(View.INVISIBLE);
            expandableListView.setVisibility(View.VISIBLE);
            btnReminder.setVisibility(View.VISIBLE);
        }

        btnReminder.setOnClickListener(v -> {
            int daysLeft = 100;

            // Minimum an verbleibenden Tagen finden
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                daysLeft = Arrays.stream(houses).mapToInt(House::getPayedForDays).min().orElse(daysLeft);
            } else {
                for (House house : houses) {
                    int paidDays = house.getPayedForDays();
                    if (paidDays < daysLeft) daysLeft = paidDays;
                }
            }

            // Davon prefHelper.getDaysForReminderMaintenance Tage abziehen (wenn nicht schon kleiner gleich 5)
            int prefDaysForReminder = prefHelper.getDaysForReminderMaintenance();

            if (daysLeft >= prefDaysForReminder) {
                daysLeft = daysLeft - prefDaysForReminder;
            }

            // Kalenderevent von heute + daysLeft erzeugen
            String calendarEventTitle = this.requireContext()
                    .getString(R.string.str_notifications_maintenance_title)
                    .replace("{0}", String.valueOf(daysLeft));
            Calendar calendarEvent = Calendar.getInstance();
            calendarEvent.add(Calendar.DAY_OF_YEAR, daysLeft);
            Intent intent = new Intent(Intent.ACTION_INSERT)
                    .setData(CalendarContract.Events.CONTENT_URI)
                    .putExtra(CalendarContract.Events.TITLE, calendarEventTitle)
                    .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, calendarEvent.getTimeInMillis())
                    .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, calendarEvent.getTimeInMillis() + (60 * 60 * 1000))
                    .putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, true);
            startActivity(intent);
        });
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof FragmentInteractionInterface) {
            mListener = (FragmentInteractionInterface) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
}

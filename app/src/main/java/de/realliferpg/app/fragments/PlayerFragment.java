package de.realliferpg.app.fragments;

import android.content.Context;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import androidx.annotation.NonNull;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import androidx.fragment.app.Fragment;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import de.realliferpg.app.R;
import de.realliferpg.app.Singleton;
import de.realliferpg.app.helper.ApiHelper;
import de.realliferpg.app.interfaces.CallbackNotifyInterface;
import de.realliferpg.app.interfaces.FragmentInteractionInterface;
import de.realliferpg.app.interfaces.RequestCallbackInterface;
import de.realliferpg.app.interfaces.RequestTypeEnum;
import de.realliferpg.app.objects.CustomNetworkError;
import de.realliferpg.app.objects.PlayerInfo;

public class PlayerFragment extends Fragment implements CallbackNotifyInterface {

    private View view;
    private View viewPlayerVehicles;
    private FragmentInteractionInterface mListener;
    private int lastAction;

    public PlayerFragment() {
        // Required empty public constructor
    }

    public static PlayerFragment newInstance() {
        PlayerFragment fragment = new PlayerFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_player, container, false);
        viewPlayerVehicles = inflater.inflate(R.layout.fragment_player_vehicles, container, false);

        final ApiHelper apiHelper = new ApiHelper((RequestCallbackInterface) getActivity());
        if (Singleton.getInstance().getPlayerInfo() == null) {
            apiHelper.getPlayerStats();
            apiHelper.getPlayerVehicles();
        } else {
            showPlayerInfo();
        }

        BottomNavigationView bnv = view.findViewById(R.id.bnv_player);
        bnv.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                switch (item.getItemId()) {
                    case R.id.bnv_player_stats:
                        mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_stats"));
                        break;
                    case R.id.bnv_player_buildings:
                        mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_buildings"));
                        break;
                    case R.id.bnv_player_vehicles:
                        mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_vehicles"));
                        break;
                }
                lastAction = item.getItemId();
                return true;
            }
        });

        bnv.setBackgroundColor(getResources().getColor(R.color.secondaryColor));

        return view;
    }

    public void showPlayerInfo() {
        PlayerInfo playerInfo = Singleton.getInstance().getPlayerInfo();

        switch (lastAction) {
            default:
            case R.id.bnv_player_stats:
                mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_stats"));
                lastAction = R.id.bnv_player_stats;
                break;
            case R.id.bnv_player_buildings:
                mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_buildings"));
                lastAction = R.id.bnv_player_buildings;
                break;
            case R.id.bnv_player_vehicles:
                mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("fragment_player_change_to_vehicles"));
                lastAction = R.id.bnv_player_vehicles;
                break;
        }

        BottomNavigationView bnv = view.findViewById(R.id.bnv_player);
        bnv.setSelectedItemId(lastAction);

        ImageView ivProfilePic = view.findViewById(R.id.iv_player_profile);

        Picasso.get().load(playerInfo.avatar_full).into(ivProfilePic);

        TextView tvName = view.findViewById(R.id.tv_player_name);
        TextView tvPid = view.findViewById(R.id.tv_player_pid);

        tvName.setText(playerInfo.name);
        tvPid.setText(playerInfo.pid);
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

    @Override
    public void onCallback(RequestTypeEnum type) {

        switch (type){
            case PLAYER:
                mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("update_login_state"));

                showPlayerInfo();
                break;
            case NETWORK_ERROR:
                CustomNetworkError error = Singleton.getInstance().getNetworkError();

                Singleton.getInstance().setErrorMsg(error.toString());
                mListener.onFragmentInteraction(PlayerFragment.class, Uri.parse("open_error"));
                break;
        }

    }

}

package de.realliferpg.app.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;

import de.realliferpg.app.R;
import de.realliferpg.app.Singleton;
import de.realliferpg.app.adapter.DonationListAdapter;
import de.realliferpg.app.interfaces.FragmentInteractionInterface;
import de.realliferpg.app.objects.Donation;
import de.realliferpg.app.objects.PlayerInfo;

public class PlayerDonationFragment extends Fragment {

    private View view;
    private FragmentInteractionInterface mListener;

    public PlayerDonationFragment() {
        // Required empty public constructor
    }

    public static PlayerDonationFragment newInstance() {
        return new PlayerDonationFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_player_donations, container, false);

        if(Singleton.getInstance().getPlayerInfo() == null){
            Singleton.getInstance().setErrorMsg("PlayerDonationFragment Error Code #1");
            mListener.onFragmentInteraction(PlayerStatsFragment.class,Uri.parse("open_error"));
        }else {
            showPlayerInfo();
        }

        return view;
    }

    public void showPlayerInfo(){
        PlayerInfo playerInfo = Singleton.getInstance().getPlayerInfo();

        RecyclerView recyclerView = view.findViewById(R.id.rv_p_donation);
        final TextView tvKeineDaten = view.findViewById(R.id.tvKeineDatenDonations);

        ArrayList<Donation> donations = new ArrayList<>(Arrays.asList(playerInfo.donations));

        LinearLayoutManager llM = new LinearLayoutManager(view.getContext());
        recyclerView.setLayoutManager(llM);

        DonationListAdapter donationListAdapter = new DonationListAdapter(donations);
        recyclerView.setAdapter(donationListAdapter);

        if (playerInfo.donations == null || playerInfo.donations.length == 0){
            tvKeineDaten.setVisibility(View.VISIBLE);
            recyclerView.setVisibility(View.INVISIBLE);
        } else {
            tvKeineDaten.setVisibility(View.INVISIBLE);
            recyclerView.setVisibility(View.VISIBLE);
        }
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

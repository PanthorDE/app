package de.realliferpg.app.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;

import de.realliferpg.app.R;
import de.realliferpg.app.helper.FractionMappingHelper;
import de.realliferpg.app.interfaces.FractionEnum;
import de.realliferpg.app.objects.PhonebookEntry;
import de.realliferpg.app.objects.Phonebooks;
import de.realliferpg.app.objects.Phones;
import de.realliferpg.app.objects.PlayerInfo;

public class PhonebookAdapter extends BaseExpandableListAdapter {
    private final Context context;
    private final PlayerInfo playerInfo;
    private ArrayList<Phonebooks> phonebooks;
    private ArrayList<Phonebooks> filteredPhonebooks;

    public PhonebookAdapter(Context _context, PlayerInfo _playerInfo) {
        this.context = _context;
        this.playerInfo = _playerInfo;
        this.filteredPhonebooks = new ArrayList<>();
        this.phonebooks = new ArrayList<>();
        this.phonebooks.addAll(Arrays.asList(_playerInfo.phonebooks));
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public int getGroupCount() {
        return playerInfo.phonebooks.length;
    }

    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public Object getGroup(int i) {
        return playerInfo.phonebooks[i];
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        final ViewHolder viewHolder;

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_item_group_phonebook, null);

            viewHolder = new ViewHolder();
            viewHolder.position = groupPosition;

            viewHolder.tvPhonebookToPhonenumber = convertView.findViewById(R.id.tv_phonebook_to_phonenumber);
            viewHolder.tvSide = convertView.findViewById(R.id.tv_phonebook_side);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.position = groupPosition;

        Phonebooks[] playerPhonebooks = playerInfo.phonebooks;
        Phonebooks phonebook = playerPhonebooks[groupPosition];
        Phones telPhone = this.getPhoneForPhonebook(phonebook);

        viewHolder.tvPhonebookToPhonenumber.setText("Telefonbuch zur Nr. " + telPhone.phone);
        FractionEnum fractionEnum = FractionMappingHelper.getFractionFromSide(phonebook.side, Integer.parseInt(playerInfo.coplevel));
        String textSidePlusMaybeDefault = FractionMappingHelper.getFractionNameFromEnum(this.context, fractionEnum);
        if (telPhone.note.equalsIgnoreCase("default")) {
            textSidePlusMaybeDefault += " (default)";
        }

        viewHolder.tvSide.setText(textSidePlusMaybeDefault);

        convertView.setTag(viewHolder);

        return convertView;
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        Phones telPhone = this.playerInfo.phones[groupPosition];
        Phonebooks[] phonebooks = this.playerInfo.phonebooks;
        int idNrPhone = telPhone.idNR;
        PhonebookEntry[] phoneBook = null;

        for (Phonebooks book : phonebooks) {
            if (book.idNR == idNrPhone && book.side.equals(telPhone.side) && !telPhone.isDisabled()) {
                phoneBook = book.phonebook;
            }
        }

        return phoneBook[childPosition];
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_item_phonebook, null);
        }

        Phonebooks phonebook = this.playerInfo.phonebooks[groupPosition];
        PhonebookEntry phoneBookEntry = phonebook.phonebook[childPosition];

        TextView tvName = convertView.findViewById(R.id.tv_phonebook_name);
        TextView tvNumber = convertView.findViewById(R.id.tv_phonebook_number);
        TextView tvIban = convertView.findViewById(R.id.tv_phonebook_iban);

        tvName.setText(context.getResources().getString(R.string.str_name) + " " + phoneBookEntry.name);
        tvNumber.setText(context.getResources().getString(R.string.str_number) + " " + phoneBookEntry.number);
        tvIban.setText(context.getResources().getString(R.string.str_iban) + " " + phoneBookEntry.iban);

        return convertView;
    }

    @Override
    public int getChildrenCount(int i) {
        return playerInfo.phonebooks[i].phonebook.length;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return true;
    }

    public Phones getPhoneForPhonebook(Phonebooks phonebook) {
        Phones[] pPhones = playerInfo.phones;
        Phones matchedPhone = null;

        for (Phones phone : pPhones) {
            if (phone.idNR == phonebook.idNR && phone.side.equals(phonebook.side)) {
                matchedPhone = phone;
                break;
            }
        }

        return matchedPhone;
    }

    public void filterData(String query) {
        query = query.toLowerCase();
        filteredPhonebooks.clear();

        if (query.isEmpty()){
            filteredPhonebooks.addAll(phonebooks);
        } else {
            for (Phonebooks phonebook : phonebooks) {
                ArrayList<PhonebookEntry> phonebookList = new ArrayList<>(Arrays.asList(phonebook.phonebook));
                ArrayList<PhonebookEntry> newPhonebookList = new ArrayList<>();
                for (PhonebookEntry entry: phonebookList) {
                    if(entry.name.toLowerCase().contains(query)) {
                        newPhonebookList.add(entry);
                    }
                }
                if (newPhonebookList.size() > 0) {
                    Phonebooks newEntry = new Phonebooks(phonebook.idNR, newPhonebookList.toArray(new PhonebookEntry[newPhonebookList.size()]));
                    filteredPhonebooks.add(newEntry);
                }
            }
        }

        this.playerInfo.phonebooks = filteredPhonebooks.toArray(new Phonebooks[filteredPhonebooks.size()]);
        notifyDataSetChanged();
    }

    private static class ViewHolder {
        TextView tvSide;
        TextView tvPhonebookToPhonenumber;
        int position;
    }
}

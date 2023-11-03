import React from 'react';
import {View} from 'react-native';
import {Avatar, Chip, Divider, List, Searchbar} from 'react-native-paper';
import {Phonebook as PhonebookModel, Profile} from '../../models';
import {Accordion} from '../Accordion';
import {LabelValue} from '../LabelValue';
import {NoResults} from '../NoResults';
import {useTranslation} from 'react-i18next';

export type PhonebookProps = {
  phonebook: PhonebookModel;
};

export const Phonebook: React.FC<PhonebookProps> = ({phonebook}) => {
  const {t} = useTranslation();
  const [keyword, setKeyword] = React.useState('');
  const shownContacts = React.useMemo(() => {
    if (keyword.length < 1) return phonebook.phonebook;
    return phonebook.phonebook.filter(pb => pb.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [keyword, phonebook.phonebook]);

  return (
    <React.Fragment>
      <View style={{marginTop: 16}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 16,
            columnGap: 16,
          }}>
          <View>
            <Avatar.Text label={phonebook.identity.name.slice(0, 2).toUpperCase()} />
          </View>

          <View>
            <LabelValue label={t('profile.phonebook_screen.id_name')} value={phonebook.identity.name} />
            <LabelValue
              label={t('profile.phonebook_screen.id_nationality')}
              value={phonebook.identity.id_nationality}
            />
          </View>

          <View>
            <LabelValue
              label={t('profile.phonebook_screen.id_dob')}
              value={phonebook.identity.id_birthday.toString()}
            />
            <Chip compact style={{marginTop: 12}}>
              {t(phonebook.identity.side.getLabel())}
            </Chip>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
        <Searchbar
          mode="bar"
          placeholder={t('profile.phonebook_screen.search_contacts_placeholder')}
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      <List.Section>
        <List.Subheader>
          {t('profile.phonebook_screen.contacts_heading', {amount: shownContacts.length})}
        </List.Subheader>
        {shownContacts.length < 1 ? (
          <List.Item
            title={t('profile.phonebook_screen.no_contacts')}
            titleStyle={{textAlign: 'center'}}
            description={
              keyword.length > 0 ? t('profile.phonebook_screen.no_contacts_for_keyword', {keyword: keyword}) : undefined
            }
            descriptionStyle={{textAlign: 'center'}}
          />
        ) : (
          shownContacts.map((contact, index) => (
            <React.Fragment key={contact.number}>
              {index !== 0 && <Divider />}
              <List.Item
                left={props => <List.Icon icon="account-circle" {...props} />}
                title={contact.name}
                description={`${contact.number || t('profile.phonebook_screen.no_phone')}\n${
                  contact.iban || t('profile.phonebook_screen.no_iban')
                }`}
              />
            </React.Fragment>
          ))
        )}
      </List.Section>
    </React.Fragment>
  );
};

export type PhonebookWrapperProps = {
  phonebooks: Profile['phonebooks'];
};

export const PhonebookWrapper: React.FC<PhonebookWrapperProps> = ({phonebooks}) => {
  const [currentPhonebook, setCurrentPhonebook] = React.useState<PhonebookModel['idNR'] | null>(null);

  return (
    <React.Fragment>
      {phonebooks.length > 0 ? (
        <List.AccordionGroup
          expandedId={currentPhonebook ?? undefined}
          onAccordionPress={expandedId =>
            setCurrentPhonebook(expandedId === currentPhonebook ? null : Number(expandedId))
          }>
          {phonebooks.map((phonebook, index, arr) => (
            <Accordion
              key={phonebook.idNR}
              id={phonebook.idNR}
              title={phonebook.identity.name}
              isFirst={index === 0}
              isLast={index === arr.length - 1}
              isExpanded={currentPhonebook === phonebook.idNR}
              surfaceStyle={{paddingVertical: 0, paddingHorizontal: 0}}
              divider>
              <Phonebook phonebook={phonebook} />
            </Accordion>
          ))}
        </List.AccordionGroup>
      ) : (
        <NoResults icon="contacts" text="Keine Telefonbücher gefunden" />
      )}
    </React.Fragment>
  );
};

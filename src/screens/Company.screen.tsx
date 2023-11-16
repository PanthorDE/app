import React from 'react';
import {List} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenDetails} from '../types/ScreenDetails.type';
import {StoreContext} from '../context/Store.context';
import {Company as CompanyModel} from '../models';
import withApiKey from '../hoc/withApiKey.hoc';
import {PanthorService} from '../services/Panthor.service';
import {Company} from '../components/Company';
import {NoResults} from '../components/NoResults';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';

export type CompanyScreenProps = {};

export const CompanyScreen: React.FC<CompanyScreenProps> = () => {
  const {apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile} = React.useContext(StoreContext);
  const [currentCompany, setCurrentCompany] = React.useState<CompanyModel['id']>(-1);

  const companies = React.useMemo(() => {
    if (!profile) return [];
    return profile.company_owned;
  }, [profile]);

  const handler = {
    fetchData: async function () {
      try {
        if (!apiKey) return;
        const newProfile = await PanthorService.getProfile(apiKey);
        setProfile(newProfile);
      } catch (error) {
        console.error(error);
        // FIXME: Add error-handling
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentCompany(cur => (cur === expandedId ? -1 : Number(expandedId)));
    },
  };

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [apiKey]);

  if (loading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper
      contentContainerStyle={{padding: 16}}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}>
      <List.AccordionGroup expandedId={currentCompany} onAccordionPress={handler.onAccordionPress}>
        {companies.length > 0 ? (
          companies.map((company, index, arr) => (
            <Company
              key={company.id}
              company={company}
              isFirst={index === 0}
              isLast={index === arr.length - 1}
              isExpanded={currentCompany === company.id}
            />
          ))
        ) : (
          <NoResults />
        )}
      </List.AccordionGroup>
    </ScreenWrapper>
  );
};

export default withApiKey(CompanyScreen);

export const CompanyScreenDetails: ScreenDetails<CompanyScreenProps> = {
  name: 'Company',
  label: 'Unternehmen',
  label_key: 'company.list.title',
  icon: 'domain',
  component: withApiKey(CompanyScreen),
};

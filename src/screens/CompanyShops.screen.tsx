import React from 'react';
import type {ScreenDetails} from '../types/ScreenDetails.type';
import {Company as CompanyModel} from '../models';
import {StoreContext} from '../context/Store.context';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';
import {PanthorService} from '../services';
import ScreenWrapper from '../ScreenWrapper';
import {List, Text} from 'react-native-paper';
import {NoResults} from '../components/NoResults';
import {CompanyShop} from '../components/Company';

export type CompanyShopsScreenProps = {};

export const CompanyShopsScreen: React.FC<CompanyShopsScreenProps> = () => {
  const {apiKey, loading, setLoading, refreshing, setRefreshing, companyShops, setCompanyShops} =
    React.useContext(StoreContext);
  const [currentCompany, setCurrentCompany] = React.useState<CompanyModel['id']>(-1);

  const handler = {
    fetchData: async function () {
      try {
        const shops = await PanthorService.getCompanyShops();
        setCompanyShops(shops);
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
        {companyShops.length > 0 ? (
          companyShops.map((company, index, arr) => (
            <CompanyShop
              key={company.industrialAreaId}
              company={company}
              isFirst={index === 0}
              isLast={index === arr.length - 1}
              isExpanded={currentCompany === company.industrialAreaId}
            />
          ))
        ) : (
          <NoResults />
        )}
      </List.AccordionGroup>
    </ScreenWrapper>
  );
};

export const CompanyShopScreenDetails: ScreenDetails<CompanyShopsScreenProps> = {
  name: 'CompanyShops',
  label: 'Unternehmen',
  icon: 'domain',
  component: CompanyShopsScreen,
};

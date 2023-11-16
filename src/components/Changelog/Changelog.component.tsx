import {format} from 'date-fns';
import React from 'react';
import {Changelog as ChangelogModel} from '../../models';
import {Accordion, type AccordionProps} from '../Accordion/Accordion.component';
import {ChangeCategory} from './ChangeCategory.component';
import {useTranslation} from 'react-i18next';

export type ChangelogProps = {
  changelog: ChangelogModel;
} & Pick<AccordionProps, 'isExpanded' | 'isLast' | 'isFirst'>;

export const Changelog: React.FC<ChangelogProps> = ({
  changelog,
  isFirst = false,
  isLast = false,
  isExpanded = false,
}) => {
  const {t} = useTranslation();
  const {id, version, changeMission, changeMod, changeMap, releaseAt} = changelog;

  return (
    <Accordion
      id={id}
      title={t('changelogs.accordion_title', {version: `v${version}`, date: format(releaseAt, 'dd.MM.yy')})}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <React.Fragment>
        {changeMission.length > 0 && (
          <ChangeCategory
            title={t('changelogs.category.mission_title')}
            changes={changeMission}
            style={{marginTop: 0}}
          />
        )}

        {changeMod.length > 0 && <ChangeCategory title={t('changelogs.category.mod_title')} changes={changeMod} />}

        {changeMap.length > 0 && <ChangeCategory title={t('changelogs.category.map_title')} changes={changeMap} />}
      </React.Fragment>
    </Accordion>
  );
};

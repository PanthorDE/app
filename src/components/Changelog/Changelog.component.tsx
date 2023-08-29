import {format} from 'date-fns';
import React from 'react';
import {Changelog as ChangelogModel} from '../../models';
import {Accordion, type AccordionProps} from '../Accordion/Accordion.component';
import {ChangeCategory} from './ChangeCategory.component';

export type ChangelogProps = {
  changelog: ChangelogModel;
} & Pick<AccordionProps, 'isExpanded' | 'isLast' | 'isFirst'>;

export const Changelog: React.FC<ChangelogProps> = ({
  changelog,
  isFirst = false,
  isLast = false,
  isExpanded = false,
}) => {
  const {id, version, changeMission, changeMod, changeMap, releaseAt} = changelog;

  return (
    <Accordion
      id={id}
      title={`Changelog v${version} - ${format(releaseAt, 'dd.MM.yy')}`}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <React.Fragment>
        {changeMission.length > 0 && <ChangeCategory title="Mission" changes={changeMission} style={{marginTop: 0}} />}

        {changeMod.length > 0 && <ChangeCategory title="Mod" changes={changeMod} />}

        {changeMap.length > 0 && <ChangeCategory title="Karte" changes={changeMap} />}
      </React.Fragment>
    </Accordion>
  );
};

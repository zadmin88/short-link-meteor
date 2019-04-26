import React from 'react';
import { Links } from '../api/links';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilters from './LinkListFilters'



export default () => {
  return (
    <div>
      <PrivateHeader title="your links"/>
      <div className="page-content">
        <LinkListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};

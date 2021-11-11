import React, { Fragment } from 'react';
// import { CardGroup, Card, Modal, Button } from "react-bootstrap";

import Navmenu from './Navmenu';
// import Footbar from './Footbar';
import Homelist from './Homelist';

export default function Home() {

  return (
    <Fragment>
      <Navmenu />
      <Homelist />
      {/* <Footbar /> */}
    </Fragment>
  );
}
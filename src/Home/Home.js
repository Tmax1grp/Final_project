import React from 'react';
// import { CardGroup, Card, Modal, Button } from "react-bootstrap";

import Navmenu from './Navmenu';
// import Footbar from './Footbar';
import Homelist from './Homelist';

export default function Home() {

  return (
    <div className="wrapper">
      <Navmenu />
      <Homelist />
      {/* <Footbar /> */}
    </div>
  );
}
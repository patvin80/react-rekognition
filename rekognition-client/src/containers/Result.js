import React from 'react'
import { Grid, Col, Row, Panel, Image, Button } from 'react-bootstrap'
import Search from './Search';

const result = (props) => {
    const gridInstance = (
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}><Image src={props.url} thumbnail/></Col>
            <Col xs={6} md={8}>
              <Panel header={ props.result.CelebrityName === "" ? null : <h3>{props.result.CelebrityName}</h3> }>
                { props.result.CelebrityQuote } <br/>
                <Button bsStyle="primary" onClick={() => {
                  let qs = encodeURIComponent(props.result.CelebrityName + " " + props.result.CelebrityQuote.substr(1, 30));
                  window.open('https://www.snopes.com?s=' + qs);
                }
                }>Snopes</Button>
              </Panel>
            </Col>
          </Row>
        </Grid>
      );
    return (
        gridInstance
    )
}

export default result;
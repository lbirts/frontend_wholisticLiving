import React, {useState, useEffect} from 'react';
import herbs from '../herbdata.json'
import ailments from '../ailments.json'
import {Card, Image, Grid} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_SERPAPI_API_KEY
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults(API_KEY)

function Herb(props) {

    const [products, setProducts] = useState([])

    const findHerb = () => {
        let slug = window.location.href.split("/")[4]
        let array = slug.split("-")
        let name = array.join(" ")
        let found = herbs.find(herb => herb.name === name)
        return found
    }

    useEffect(() => {
        client.json(parameter, callback)
    }, [])

    var parameter = {
    q: "Natural" + findHerb().name,
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
    };

    var callback = function(data) {
        setProducts(data.shopping_results.slice(0, 6))
    }

    return(
        <div style={{marginTop: "30px", marginLeft: "30px"}}>
        <h3>{findHerb().name}</h3>
        <div>{findHerb().description}</div>
        <h4>Uses</h4>
        <ul>
        {findHerb().uses.map(use => (
            <li>
                {use}
            </li>
        ))}
        </ul>
        <h4>Warning</h4>
        <div>{findHerb().warnings}</div>
        <h4>Products</h4>
        <Grid>
        {products ? products.map(product => (
            <Grid.Column width={2}>
            <Link to={product.link}>
            <Card style={{width: "200px"}}>
                <Image src={product.thumbnail}/>
                <Card.Content>
                    <Card.Header style={{fontSize: "14px", marginBottom: "60px"}}>{product.title}</Card.Header>
                    <Card.Meta>{product.source}</Card.Meta>
                    <Card.Description>{product.price}</Card.Description>
                </Card.Content>
            </Card>
            </Link>
            </Grid.Column>
        )) : null}
        </Grid>
        </div>

    )
}

export default Herb



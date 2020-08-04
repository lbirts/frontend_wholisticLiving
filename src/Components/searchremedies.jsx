import React, { useState } from 'react';
import herbs from '../herbdata.json'
import ailments from '../ailments.json'
import './search.css'
import {Search, Grid, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckIcon from '@material-ui/icons/Check';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'




function SearchRemedy() {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([])
    const [value, setValue] = useState('')
    const [filteredRemedies, setFilteredRemedies] = useState([])
    const [listening, setListening] = useState(false)

    const {transcript, resetTranscript } = useSpeechRecognition()

    const handleResultSelect = (e, {result}) => setValue(result.title)

    const handleSearchChange = (e, {value}) => {
        setFilteredRemedies([])
        setIsLoading(true)
        setValue(value)
        setTimeout(() => {
            if (value.length < 1) {
                setFilteredRemedies([])
                setIsLoading(false)
                setValue('')
                setListening(false)
                setResults([])
            }

            const re = new RegExp(_.escapeRegExp(value), "i")
            const isMatch = (result) => re.test(result.title)

            setIsLoading(false)
            setResults(_.filter(ailments, isMatch))
        },  300)
        
    }

    const handleMouse = (e) => {
        if (e.key && e.key === "Enter") {
            let filtered = []
            let symptoms = value.split(" ")
            herbs.map((herb => symptoms.map(symp => {
                let count = 0
                herb.uses.map(use => {
                    if (use.toLowerCase().includes(symp.toLowerCase())) {
                        if (filtered.find(filter => filter.name === herb.name)) {
                            let filter = filtered.find(obj => obj.name === herb.name)
                            filter = {...filter, count: ++filter.count}
                        } else {
                            let newHerb = {...herb, count: ++count, favorite: false}
                            filtered = [...filtered, newHerb]
                        }
                    }
                })
            })))
            setFilteredRemedies(filtered.sort((a, b) => b.count - a.count))
		}
    }

    const handleFavorites = (herb) => {
        let found = filteredRemedies.find(obj => obj.name === herb.name)
        let index = filteredRemedies.indexOf(found)
        found = {...found, favorite: !found.favorite}
        filteredRemedies.splice(index, 1, found)
        setFilteredRemedies(filteredRemedies)  
    }

    const handleListening = () => {
        setListening(!listening)
        console.log(!listening)
        if (!listening) {
            resetTranscript()
            SpeechRecognition.startListening()
        } else {
            SpeechRecognition.abortListening()
            setValue(transcript)
        }
    }

    let symptoms = value.split(" "); 
        return ( 
            <Grid>
                <Grid.Row style={{marginTop: "50px", marginLeft: "500px"}}>
                <Icon onClick={handleListening} style={{marginLeft: "100px", marginTop: "13px"}} size="big" name="microphone"/>
                <Search
                    input={{ icon: 'search', iconPosition: 'right'}}
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                    })}
                    results={results}
                    value={value}
                    className="search"
                    showNoResults={false}
                    minCharacters={2}
                    fluid={true}
                    // onMouseDown={handleMouse}
                    onKeyPress={handleMouse}
                    // style={{width: "5000px"}}
                />
                </Grid.Row>
                <Grid.Row>
                    <div style={{width: "1000px"}} className="remedies">
                        {filteredRemedies.map(remedy => (
                            <div key={remedy.id} style={{border: "1px solid lightgrey", borderRadius: "15px", marginTop: "20px", padding: "20px", boxShadow: "0 1px 2px rgba(0,0,0,.05)"}} className="rem-card">
                                {remedy.favorite ?  <StarIcon style={{color: "#3e81a5"}} onClick={() => handleFavorites(remedy)} /> : <StarBorderIcon onClick={() => handleFavorites(remedy)} />} 
                                <Link to={`herbs/${remedy.name.split(" ").join("-")}`}>
                                <div style={{fontSize: "18px"}} className="name">{remedy.name}</div>
                                <div style={{color: "#767676"}} className="description">{remedy.description.split(".").slice(0, 3).map(des => `${des}.`)}..</div>
                                <div className="uses">  
                                {remedy.uses.map(use => (
                                    symptoms.map(symp => (
                                        use.toLowerCase().includes(symp.toLowerCase()) ? <Label className="use-label" style={{backgroundColor: "#3e81a5", color: "white"}}><CheckIcon/>{use.split(":")[0]}</Label> : <Label className="use-label"><CheckIcon/>{use.split(":")[0]}</Label>
                                    ))     
                                ))}
                                </div>
                                </Link>
                                <Label color="grey" className="use-ratio">{(remedy.count / remedy.uses.length * 100).toFixed(0)}%</Label>
                            </div>
                        ))}
                    </div>
                </Grid.Row>
            </Grid>
         );
}
 
export default SearchRemedy;
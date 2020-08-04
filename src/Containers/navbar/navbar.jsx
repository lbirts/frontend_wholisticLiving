import React, {useEffect, useRef} from 'react';
import './navbar.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink, withRouter} from 'react-router-dom'
import logo from '../../assets/holLife_logo.png'
import { Button } from '@material-ui/core'
import MenuDropdown from './dropdown';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/actions'


function Navbar(props) {
    // const [activeItem, setActiveItem] = useState('Home')
    // function handleItemClick(e, {name}) {
    //     setActiveItem(name)
    // }
    // 
    // let communityLinks = []
    let communitylinksRef = useRef([
        {
            name: "Explore all categories",
            url: '/community'
        }
    ])

    const accountLinks = [
        {
            name: "Care Team",
            url: "/account/care-team"
        },
        {
            name: "Appointments",
            url: "/account/appointments"
        },
        {
            name: "Messages",
            url: "/account/messages"
        }
    ]
    // const [anchorEl, setAnchorEl] = useState(null)

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null)
    // };

    // const [categories, setCategories] = useState(communitylinksRef)

    useEffect(() => {
        // setCategories(props.categories)
        if (props.categories.length > 0) {
            props.categories.map(category => {
            const lower = category.title.toLowerCase()
            const nameDashed = lower.split(' ').join('-')
            let newCategory = { name: category.title, url: `/community/${nameDashed}`}
            communitylinksRef.current = [newCategory, ...communitylinksRef.current]
        })
        
        }
    }, [props.categories])

    const doLogout = () => {
        localStorage.clear()
        props.dispatch(logoutUser())
        props.history.push("/")
    }
    
    return(
        <AppBar position="static" className="appNav">
            <Toolbar className="menu-content">
                <NavLink className="menu-logo" aria-label="holLife Logo" to="/">
                    <img alt="holLife Logo" src={logo}/>
                </NavLink>
                <div className="menu-links" role="navigation">
                    <NavLink aria-label="Find Care" to="/care">
                        Find Care
                    </NavLink>
                    <MenuDropdown
						className="nav-dropdown"
						ariaLabel="Community"
						title="Community"
						topCta={<NavLink to="/account/posts">My posts and replies</NavLink>}
						topCtaEventTitle="My posts and replies"
						items={communitylinksRef.current}
						bottomCtaEventTitle="Write a post"
						bottomCta={
							<>
								<span className="have-question">Have a question?</span>
								<Button className="post-btn" component={NavLink} to="/community/post/create">
									Write a post
								</Button>
							</>
						}
					>
						Community
					</MenuDropdown>
                    <MenuDropdown
						className="nav-dropdown"
						ariaLabel="My Settings"
						title="Personal"
						topCta={<NavLink to="/dashboard">Dashboard</NavLink>}
						topCtaEventTitlef="Account settings"
						items={accountLinks}
						bottomCta={
							<button className="logout" type="button" onClick={doLogout}>
								Log out
							</button>
						}
                        bottomCtaEventTitle="Log out"
					>
						Personal
					</MenuDropdown>
                    {props.user ? null : 
                    <NavLink aria-label="Login" to="/login">
                        <button style={{backgroundColor: "#3e81a5", color: "white", borderRadius: "25px", width: "100px", height: "30px", marginTop: "10px"}}>Login</button>
                    </NavLink>}
                    
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      user: state.users.user
    }
}
  
export default connect(mapStateToProps)(withRouter(Navbar));
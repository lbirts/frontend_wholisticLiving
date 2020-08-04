import React, { useState, useEffect } from 'react';
import {Search, Grid} from 'semantic-ui-react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { choosePost } from '../../redux/actions/actions';
import {Link} from 'react-router-dom';
import './community.css';
import Caret from '../../assets/caretIcon';
import moment from 'moment'

function Comm(props) {

    const [value, setValue] = useState("")
    const [category, setCategory] = useState({})

    useEffect(() => {
        setCategory(findCategory())
    }, [category])

    const handleSearchChange = (e, {value}) => {
        setValue({ value})
    }

    const handleMouse = (e) => {
        if (e.key && e.key === "Enter") {
            console.log(value)
		}
    }

    const findCategory = () => {
        let slug = window.location.href.split("/")[4]
        let array = slug.split("-")
        array.shift()
        let category = array.join("-")
        let found = props.categories.find(cat => cat.slug === category)
        return found
    }


    const sortRecent = (category) => {
        if (props.posts) {
           let posts = findPosts(category)
            // console.log(posts)
            let recentPosts = posts.sort((a,b) => moment(a.created_at) - moment(b.created_at)).slice(0,3)
            console.log(recentPosts)
            return recentPosts
        }
    }

    const findPosts = (category) => {
        if (props.posts) {
            let posts = props.posts.filter(post => post.category.title === category.title)
            console.log(posts)
            return posts
        }
    }

    const postAuthor = (client) => {
        if (props.users) {
            let user = props.users.find(user => user.id === client.user_id)
            return user
        }
    }

    // const splitBody = (content) => {
    //     bodyArray = content.split(" ")
    //     return `${bodyArray[0]}`
    // }

    return ( 
        <Grid className="bigContainer">
            <Grid.Row>
                <Link className="shortcut" to="/community"><Caret className="flip"/>All Community</Link>
            </Grid.Row>
           <Grid.Row>
           <Grid.Column width={3}>
            <h2 className="bigHeader">{category ? category.title : null}</h2>
            </Grid.Column>
            <Grid.Column width={5}>
            <Search
                input={{ icon: 'search', iconPosition: 'left' }}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
                })}
                value={value}
                className="search"
                showNoResults={false}
                fluid={true}
                size="tiny"
                onKeyPress={handleMouse}
                style={{marginLeft: "-600px"}}
                placeholder="What are you looking for?"
            />
            </Grid.Column>
            </Grid.Row>
                <Grid.Row className="post-content content" style={{marginLeft: "250px"}}>
                <div class="center recent-header">
                    <h2 class="h3 serif header-text">Recent Posts</h2>
                    {/* <img width="50" height="50" src="https://caregiversbywholecare.com/wp-content/uploads/2018/10/Mental-Health-300x300.jpg" alt={category.title}/> */}
                </div>
                <ul className="clear clearfix recent-posts-list content">
                {category ? sortRecent(category).map(post => (
                    <li>
                        <div className="post-list-view">
                            <div className="post-author">
                                <div className="clearfix user-av">
                                    <span className="avatar-wrapper">
                                        <img width="50" height="50" className="avatar-icon" src={postAuthor(post.client) ? postAuthor(post.client).avatar : null} alt="Author Profile"/>
                                    </span>
                                    <span className="info-wrapper">
                                        <p className="user-info">
                                            <span className="user-name">{postAuthor(post.client) ? postAuthor(post.client).name : null}</span>
                                            <br/>
                                            <span className="date">{post ? moment(post.created_at).format("MMMM Do") : null}</span>
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <h2 className="h5"><Link to={`/posts/${post.id}-${post.slug}`}>{post.title}</Link></h2>
                            <p className="post-body">{post.content.split(".").slice(0, 3).map(body => `${body}.`)}..</p>
                            <div className="btn-container">
                                <Link to={`/posts/${post.id}-${post.slug}`} className="btn btn-teriary">View all replies</Link>
                            </div>
                        </div>
                    </li>
                )) : null}
                </ul>
                </Grid.Row>

                <Grid.Row style={{marginLeft: "150px"}}>
                <div class="q-container">
                    <span className="post-span">Have a question of your own?</span>
                    <span><Link class="btn btn-cta" to="/posts/create">Write a post</Link></span>
                </div>
                </Grid.Row>

                <Grid.Row className="post-content content" style={{marginLeft: "250px"}}>
                {/* <div class="center recent-header">
                    <h2 class="h3 serif header-text">Recent Posts</h2>
                </div> */}
                <ul className="clear clearfix recent-posts-list content">
                {category ? findPosts(category).map(post => (
                    <li>
                        <div className="post-list-view">
                            <div className="post-author">
                                <div className="clearfix user-av">
                                    <span className="avatar-wrapper">
                                        <img width="50" height="50" className="avatar-icon" src={postAuthor(post.client) ? postAuthor(post.client).avatar : null} alt="Author Profile"/>
                                    </span>
                                    <span className="info-wrapper">
                                        <p className="user-info">
                                            <span className="user-name">{postAuthor(post.client) ? postAuthor(post.client).name : null}</span>
                                            <br/>
                                            <span className="date">{post ? moment(post.created_at).format("MMMM Do") : null}</span>
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <h2 className="h5 recentTitle"><Link to={`/posts/${post.id}-${post.slug}`}>{post.title}</Link></h2>
                            <p className="post-body">{post.content.split(".").slice(0, 3).map(body => `${body}.`)}..</p>
                            <div className="btn-container">
                                <Link to={`/posts/${post.id}-${post.slug}`} className="btn btn-teriary">View all replies</Link>
                            </div>
                        </div>
                    </li>
                )) : null}
                </ul>
                </Grid.Row>
        </Grid>
        );
}
 
const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      providers: state.providers.providers,
      specialties: state.providers.specialties,
      posts: state.posts.posts,
      users: state.users.users
    }
}

const mapDispatchToProps = dispatch => ({
    // loadPosts: posts => dispatch(loadPosts(posts)),
    choosePost: post => dispatch(choosePost(post))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Comm);
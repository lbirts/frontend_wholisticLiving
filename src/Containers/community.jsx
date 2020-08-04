import React, { useState, useEffect } from 'react';
import {Search, Grid} from 'semantic-ui-react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { choosePost } from '../redux/actions/actions';
import {Link} from 'react-router-dom';
import '../Components/community_board/community.css';
import Caret from '../assets/caretIcon';
import moment from 'moment'



function Community(props) {
    const [value, setValue] = useState("")

    const handleSearchChange = (e, {value}) => {
        setValue({ value})
    }

    const handleMouse = (e) => {
        if (e.key && e.key === "Enter") {
            console.log(value)
		}
    }

    const sortPopular = (category) => {
        if (props.posts) {
            let posts = props.posts.filter(post => post.category !== category.title)
            // console.log(posts)
            let popularPosts = posts.sort((a,b) => a.comments.length - b.comments.length).slice(0,5)
            return popularPosts
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
            <Grid.Column width={3}>
            <h2 className="bigHeader">Community</h2>
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
            <Grid.Row className="community-content">
                <ul className="clear communities-header">
                   {props.categories.map(category => (
                       <li>
                            <Link to={`/community/${category.id}-${category.slug}`}>
                                <div className="community-title">
                                <div className="community-image">
                                    <img width="50" height="50" src="https://caregiversbywholecare.com/wp-content/uploads/2018/10/Mental-Health-300x300.jpg" alt={category.title}/>
                                </div>
                                <div class="p">{category.title}</div>
                                </div>
                            </Link>
                        </li>
                   ))} 
                </ul>
            </Grid.Row>
            <Grid.Row>
                <div class="cta-container">
                    <span className="post-span">Have a question of your own?</span>
                    <span><Link class="btn btn-cta" to="/posts/create">Write a post</Link></span>
                </div>
            </Grid.Row>

            {props.categories.map(category => (
                <Grid.Row className="post-content">
                <div class="center popular-header">
                    <h2 class="h3 serif header-text">Popular in {category.title}</h2>
                    {/* <img width="50" height="50" src="https://caregiversbywholecare.com/wp-content/uploads/2018/10/Mental-Health-300x300.jpg" alt={category.title}/> */}
                </div>
                <ul className="clear clearfix popular-posts-list content">
                {sortPopular(category).map(post => (
                    <li>
                        <div className="post-list-view">
                            <div className="post-author">
                                <div className="clearfix user-avatar">
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
                ))}
                </ul>
                <p className="view-all">
                    <Link to={`/community/${category.id}-${category.slug}`} className="btn">View all popular posts</Link>
                    <Caret className="extraCaret"/>
                </p>
                </Grid.Row>
            ))}
            
                {/* <ul className="clear communities-header">
                   {props.categories.map(category => (
                       <li>
                            <Link to={`/community/${category.id-category.slug}`}>
                                <div className="community-title">
                                <div className="community-image">
                                    <img width="50" height="50" src="https://caregiversbywholecare.com/wp-content/uploads/2018/10/Mental-Health-300x300.jpg" alt={category.title}/>
                                </div>
                                <div class="p">{category.title}</div>
                                </div>
                            </Link>
                        </li>
                   ))} 
                </ul> */}
            
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

export default connect(mapStateToProps, mapDispatchToProps)(Community);
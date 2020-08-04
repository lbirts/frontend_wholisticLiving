import React, { useState, useEffect } from 'react';
import {Search, Grid} from 'semantic-ui-react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { choosePost, addComment } from '../../redux/actions/actions';
import {Link, withRouter } from 'react-router-dom';
import './community.css';
import moment from 'moment'
import Caret from '../../assets/caretIcon'

function Post(props) {

    const [value, setValue] = useState("")
    const [post, setPost] = useState({})
    const [anon, setAnon] = useState(false)
    const [commentValue, setCommentValue] = useState("")

    useEffect(() => {
        setPost(findPost())
    }, [props])

    const handleSearchChange = (e, {value}) => {
        setValue({ value})
    }

    // const handleMouse = (e) => {
    //     if (e.key && e.key === "Enter") {
    //         console.log(value)
	// 	}
    // }

    const findPost = () => {
        let slug = props.location.pathname.split("/")[2]
        let array = slug.split("-")
        array.shift()
        let post = array.join("-")
        let found = props.posts.find(cat => cat.slug === post)
        return found
    }

    const handleForm = (e) => {
        if (e.target.name === "comment") {
            setCommentValue(e.target.value)
        } else {
            setAnon(!anon)
        }
    }


    const sortRecent = (category) => {
        if (props.posts) {
           let posts = findPosts(category)
            // console.log(posts)
            let recentPosts = posts.sort((a,b) => a.created_at - b.created_at).slice(0,3)
            // console.log(recentPosts)
            return recentPosts
        }
    }

    const findPosts = (category) => {
        if (props.posts) {
            let posts = props.posts.filter(post => post.category.title === category.title)
            // console.log(posts)
            return posts
        }
    }

    const postAuthor = (client) => {
        // console.log(props.users)
        if (props.users) {
            let user = props.users.find(user => user.id === client.user_id)
            // console.log(user)
            return user
        }
    }

    const handleSubmit = (e) => {
        // console.log("here")
        e.preventDefault()
        fetch("http//localhost:3000/api/v1/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json",
              "Authorization": `Bearer ${props.user.token}`
            },
            body: JSON.stringify({
                user_id: props.user.id,
                content: commentValue,
                anon: anon,
                post_id: post.id
            })
        })
        .then(res => res.json())
        .then(newComment => {
            console.log(newComment)
            // props.addComment(newComment.comment)
        })
    }

    // const splitBody = (content) => {
    //     bodyArray = content.split(" ")
    //     return `${bodyArray[0]}`
    // }

    return ( 
        <Grid className="bigContainer">
        <Grid.Row>
            <Link style={{marginRight: "100px"}} className="shortcut" to="/community"><Caret className="flip"/>All Community</Link>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={5}>
            <h2 className="bigHeader">Join the Conversation</h2>
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
                style={{marginLeft: "-600px"}}
                placeholder="What are you looking for?"
                size="tiny"
            />
            </Grid.Column>
            </Grid.Row>
                <Grid.Row className="post-content main-post content">
                <div className="post-list-view">
                    <div className="post-author" style={{marginLeft: "-190px"}}>
                        <div className="clearfix user">
                            <span className="avatar-wrapper">
                                <img width="50" height="50" className="avatar-icon" src={post && post.client && postAuthor(post.client) ? postAuthor(post.client).avatar : null} alt="Author Profile"/>
                            </span>
                            <span className="info-wrapper">
                                <p className="user-info">
                                    <span className="user-name">{post && post.client && postAuthor(post.client) ? postAuthor(post.client).name : null}</span>
                                    <br/>
                                    <span className="date">{post ? moment(post.created_at).format("MMMM Do") : null}</span>
                                </p>
                            </span>
                        </div>
                    </div>
                    <h2>{post && post.title ? post.title : null}</h2>
                    <p className="post-body">{post && post.title ? post.content : null}</p>
                    <a className="reply-link" href="#comment-form">Reply</a>
                    <p className="reply-count">{post && post.comments ? post.comments.length : null} replies</p>
                </div>
                </Grid.Row>
                <Grid.Row>
                <ul className="clear clearfix comments-list">
                    {post && post.comments ? post.comments.map(comment => (
                    <li>
                    <div className="post-list-view">
                        <div className="post-author" style={{marginLeft: "-190px"}}>
                            <div className="clearfix user">
                                <span className="avatar-wrapper">
                                    <img width="50" height="50" className="avatar-icon" src={postAuthor(comment) ? postAuthor(comment).avatar : null} alt="Author Profile"/>
                                </span>
                                <span className="info-wrapper">
                                    <p className="user-info">
                                        <span className="user-name">{postAuthor(comment) ? postAuthor(comment).name : null}</span>
                                        <br/>
                                        <span className="date">{post ? moment(post.created_at).format("MMMM Do") : null}</span>
                                    </p>
                                    <p style={{marginLeft: "-10px", color: "#3e81a5", marginTop: "-10px"}}>Book an appointment</p>
                                </span>
                            </div>
                        </div>
                        <p style={{marginTop: "20px"}} className="post-body">{comment.content}</p>
                    </div>
                    </li>
                    )) : null}
                </ul>
                </Grid.Row>
                <Grid.Row>
                    <form onSubmit={handleSubmit} id="comment-form">
                        <div>
                            <span style={{marginRight: "700px", marginBottom: "-200px", color: "#3e81a5"}}>{props.user.name}</span>
                            <span>
                            <label style={{marginBottom: "-18px", marginLeft: "575px"}} for="anonymous">Post Anonymously</label>
                            <input style={{backgroundColor: "#3e81a5", height: "20px", width: "20px", marginLeft: "770px"}} type="checkbox" name="anonymous" value={anon} onChange={handleForm}></input>
                            </span>
                        </div>
                        <label for="comment"></label>
                        <input style={{width: "800px", borderColor: "lightgrey"}} name="comment" type="text" value={commentValue} onChange={handleForm}></input>
                        <button type="submit">Reply to this post</button>
                    </form>
                </Grid.Row>
                <Grid.Row style={{marginLeft: "200px"}} className="post-content content">
                <div class="center recent-header">
                    <h2 class="h3 serif header-text">More post like this</h2>
                </div>
                <ul style={{marginLeft: "140px"}} className="clear clearfix popular-posts-list content">
                {post && post.category ? findPosts(post.category).map(post => (
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
                            <p className="post-body">{post.content.split(".").slice(0, 2).map(body => `${body}.`)}..</p>
                            <div className="btn-container">
                                <Link to={`/posts/${post.id}-${post.slug}`} className="btn btn-teriary">Continue Reading</Link>
                            </div>
                        </div>
                    </li>
                )) : null}
                </ul>
                </Grid.Row>
                <Grid.Row style={{marginLeft: "120px"}}>
                <div class="q-container">
                    <span className="post-span">Have a question of your own?</span>
                    <span><Link class="btn btn-cta" to="/posts/create">Write a post</Link></span>
                </div>
                </Grid.Row>
                <Grid.Row style={{marginLeft: "120px"}}>
                <section className="bottom-cta full-bgcol">
                    <div className="content-container">
                        <div className="content">
                            <h2 style={{marginLeft: "-10px"}}>Need an expert's advice, stat?</h2>
                            <p style={{marginLeft: "100px"}}>Send a private message or video chat with a variety of practioners.</p>
                            {/* ng-click="$ctrl.goToReact('/app/book')" */}
                            <Link to="/appointments"><button className="btn btn-cta">Find a provider</button></Link>
                            <Link to="/account/messages" style={{marginLeft: "180px"}}>Not sure who to talk to? Ask Caitlyn</Link>
                        </div>
                    </div>
                </section>
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
      users: state.users.users,
      user: state.users.user
    }
}

const mapDispatchToProps = dispatch => ({
    // loadPosts: posts => dispatch(loadPosts(posts)),
    choosePost: post => dispatch(choosePost(post)),
    addComment: comment => dispatch(addComment(comment))
  });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));

// <div class="content-container">
// 	<section class="forum-post-body">
// 		<forum-post-body user="$ctrl.user" post="$ctrl.post"><div class="post-detail">
// 	<div class="post content" tabindex="0">
// 		<div class="post-meta-author">
// 			<span ng-if="$ctrl.post" class="" style=""><post-author class="post-author" author="$ctrl.post.author" datetime="$ctrl.post.created_at"><div class="clearfix" ng-class="{ prac: authorProfession }">
// 	<user-avatar show="username" user="author" class="show">
				

				
				

				

// 				<span ng-if="noAvatar" class="avatar-wrap">
// 					<span class="avatar-icon anon" tabindex="-1" aria-hidden="true">?</span>
// 				</span>
// 						</user-avatar>

// 	<div ng-if="!authorProfession">
// 		<p class="user-name">
// 			<span class="name" ng-if="name">Anonymous</span>
			
// 			<br>
// 			<span class="post-date"> Jul 23</span>
// 		</p>
// 	</div>

	
// </div>
// </post-author></span>
// 		</div>

// 		<div class="post-content">
// 			<h2 class="post-title h3">Help!!</h2>
// 			<div class="post-body">All of a sudden in the last week my 2 month old wants nothing to do with her father and we live together. Even if he tries to give her a bottle she’ll scream and won’t let him feed her even if she’s hungry until i take her and I never once breastfed so it’s not that attachment there. We don’t understand nothing at all has changed and she is not like this with anyone else she just does not stop screaming when he holds her or even looks at her when she’s laying down and the instant i take her she stops. it drives me crazy i can’t catch a break: what could it be????</div>
// 		</div>

// 		<div class="post-meta clearfix">
// 			<span class="post-action">
// 				<a ng-click="$ctrl.goToReply()">
// 					Reply
// 				</a>
// 			</span>
// 			<span ng-if="$ctrl.post" class="post-action" style="">
// 				<mvn-bookmark-post class="follow-post" post="$ctrl.post" user="$ctrl.user"><a class="icon-bookmark" href="" ng-class="{ bookmarked: post.has_bookmarked }" ng-click="toggleBookmarked()"><svg width="20" height="17" viewBox="0 0 22 25" xmlns="http://www.w3.org/2000/svg"><title>Bookmark post</title><path stroke="#00856f" stroke-width="1.2" d="M20.777 23.808l-9.87-6.842L1 23.808V1h19.777z" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span ng-if="!post.has_bookmarked">Bookmark</span></a></mvn-bookmark-post>
// 			</span>
// 		</div>
// 	</div>
// </div>
// </forum-post-body>
// 	</section>

// 	<section class="forum-post-replies">
// 		<forum-post-replies ng-if="$ctrl.post" class="reply-view" user="$ctrl.user" post="$ctrl.post" get-replies="$ctrl.getReplies(post_id)" replies="$ctrl.replies"><section class="post-replies">
// 	<div class="content-container">

// 		<div ng-hide="loading" class="replies-wrap" aria-hidden="false">

// 			<div class="replies">

// 				<div class="replies-count">
// 					<h2 class="center h5 ng-hide" ng-show="$ctrl.replies.pagination.total   < 1 " aria-hidden="true" style="">Be the first to reply to this post</h2>
// 					<h2 class="center h5" ng-show="$ctrl.replies.pagination.total  >= 1  " aria-hidden="false" style="">1 replies</h2>
// 				</div>

// 				<ul ng-hide="loading" class="clear" aria-hidden="false">

// 					<li class="post reply-list content practitioner" tabindex="0" ng-repeat="reply in $ctrl.replies | orderBy:'created_at' " style="">

// 						<post-author ng-if="reply.author.role === 'practitioner' " ng-click="viewPrac(reply.author.id)" author="reply.author" datetime="reply.created_at" class="post-author practitioner-reply clearfix" role="button" tabindex="0"><div class="clearfix prac" ng-class="{ prac: authorProfession }">
// 	<user-avatar show="username" user="author" class="show">
// 				<span ng-if="hasImg" class="avatar-wrap has-photo prac-photo" ng-class="avatarClass">
// 					<img ng-src="https://d3kteh0pr56dm7.cloudfront.net/MJlX5IRmxmTdYMSnu_XwLPWhCvQ=/500x500/smart/https://storage.googleapis.com/maven-prod-images/5f22db22-bccf-4a79-85fb-9c679b6fbe2e" class="avatar" width="48" height="48" alt="" src="https://d3kteh0pr56dm7.cloudfront.net/MJlX5IRmxmTdYMSnu_XwLPWhCvQ=/500x500/smart/https://storage.googleapis.com/maven-prod-images/5f22db22-bccf-4a79-85fb-9c679b6fbe2e">
// 				</span>

				
				

				

				
// 						</user-avatar>

	

// 	<div ng-if="authorProfession" class="profession">
// 		<p class="user-name">
// 			<span class="name" ng-if="name">Jamie Hutton</span>
// 			<br>
// 			<span class="practitioner-profession">Pediatrician</span>
// 		</p>
// 		<div class="post-action">
// 			<a ng-click="goBookPrac(author.profiles.practitioner.user_id)"> Book appointment</a>
// 		</div>
// 	</div>
// </div>
// </post-author>
						

// 						<div class="post-body">Congrats on the baby!  They are amazing and exhausting all at the same time.
// Are you with the baby the most during the day? Does she act this way with other men? Has his appearance changed at all recently? (Shaved off a beard, grown a beard, different haircut)  
// Little girls in particular are very social.  Some will develop stranger anxiety very early on.  Although Dad is not a true stranger, she still recognizes and is most comfortable with you currently.  However, reassure Dad.  This is just a phase and she will out grow it.  Often for her to settle down and accept Dad you will have to not be in the room and possibly not even in the house.  So I would recommend for you to take a break.  Leave the baby with Dad and go for a walk, run a couple of errands, or hide in the bathroom and take a nice bubble bath.  It is ok to make time for you!  She will stop crying, if not crying is not going to hurt her for 30 minutes while you take some me time.</div>

// 					</li>
// 				</ul>

				
// 			</div>
// 		</div>

// </div></section>
// </forum-post-replies>
// 	</section>

// 	<section class="forum-create-reply content">
// 		<forum-create-reply ng-if="$ctrl.post" user="$ctrl.user" post="$ctrl.post" get-replies="$ctrl.getReplies(post_id)" is-modal="$ctrl.isModal" replies="$ctrl.replies"><div class="create-reply" ng-if="!$ctrl.hideReplyForm" style="">

// 	<div ng-show="errorMsg" aria-hidden="true" class="ng-hide">
		
// 	</div>

// 	<form role="form" name="createReplyForm" id="write-reply" class="ng-pristine ng-invalid ng-invalid-required">
		
		
// 			<div ng-hide="loading" class="" aria-hidden="false">
// 				<div ng-if="$ctrl.user.role !== 'practitioner' " class="reply-anon-wrap">


// 						<div class="post-author-container">
							
								
// 								<div ng-if="!$ctrl.replyForm.anonymous">
									
// 									<div ng-if="!$ctrl.user.username" class="no-username"><a ng-click="$ctrl.addUsername()" href="">Add username</a></div>
// 								</div>
					
// 								<div class="mvn-checkbox-group post-anon-checkbox">
// 									<div class="checkbox-container swap-alignment">
// 										<input id="post-anon" name="post-anon" class="checkmark ng-pristine ng-untouched ng-valid ng-empty" type="checkbox" ng-model="$ctrl.replyForm.anonymous" ng-checked="$ctrl.replyForm.anonymous" role="checkbox" aria-checked="false" aria-labelledby="post-anon-checkmark" aria-invalid="false">
// 										<label class="label-text" aria-label="Post anonymously" for="post-anon" id="post-anon-checkmark">Post anonymously</label>
// 									</div>
// 								</div>
// 							</div>
							
// 				</div>
// 			</div>


// 		<div class="form-group">
// 			<textarea rows="10" name="body" ng-model="$ctrl.replyForm.body" required="required" class="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" placeholder="Write your reply..." aria-invalid="true"></textarea>
// 			<input type="hidden" name="parent_id" ng-model="$ctrl.replyForm.parent_id" required="required" ng-value="55328" autocomplete="off" class="ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required" value="55328">
// 		</div>

// 		<div class="center submit-reply">
// 			<a ng-click="$ctrl.reply($ctrl.replyForm)" href="" class="btn btn-cta reply-submit disabled" ng-class="{ 'disabled' : !$ctrl.replyForm.body }">Reply to this post</a>
// 		</div>

// 	</form>
// </div>

// </forum-create-reply>
// 	</section>

// 	<section class="forum-recommended-posts">
// 		<forum-recommended-posts ng-if="$ctrl.post" post="$ctrl.post" show="4" class="show"><div ng-if="$ctrl.posts.length" class="" style="">
// 	<h2 class="forum-list-header h5 serif">More posts like this</h2>

	

// 	<div ng-if="!$ctrl.loading">
// 		<ul class="clear clearfix recommended-posts">
// 			<li ng-repeat="post in $ctrl.posts">
// 				<div class="post-list-view content">
// 					<h2 class="h5">
// 						<a ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/10677/annoyed-by-sick-mom#write-reply">Annoyed by Sick Mom</a>
// 					</h2>
// 					<p class="post-list-body">I know it's bad and may seem insensitive but my mother drives me crazy when she is sick! Specifically the way she acts- as if she's trying to emphasize the fact that she is sick so that she can have …</p>
// 					<p class="continue-read">
// 						<a class="btn btn-tertiary" ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/10677/annoyed-by-sick-mom#write-reply">Continue reading</a>
// 					</p>
// 				</div>
// 			</li><li ng-repeat="post in $ctrl.posts">
// 				<div class="post-list-view content">
// 					<h2 class="h5">
// 						<a ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/17175/stranger-danger#write-reply">stranger danger!</a>
// 					</h2>
// 					<p class="post-list-body">My 3 mo old has stranger danger! She won’t let anyone else hold her and it’s really awful—I literally can’t put her down. My husband tries to be patient but I can tell he is pretty hurt by it. What …</p>
// 					<p class="continue-read">
// 						<a class="btn btn-tertiary" ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/17175/stranger-danger#write-reply">Continue reading</a>
// 					</p>
// 				</div>
// 			</li><li ng-repeat="post in $ctrl.posts">
// 				<div class="post-list-view content">
// 					<h2 class="h5">
// 						<a ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/34084/baby-breastfeeding-too-much#write-reply">Baby breastfeeding too much?</a>
// 					</h2>
// 					<p class="post-list-body">My baby is 4 months old and breastfeeds only (has a bottle or two of expressed milk per day). I read babies at this age can go 3/4 hours between day feeds, but my baby tends to want to feed every …</p>
// 					<p class="continue-read">
// 						<a class="btn btn-tertiary" ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/34084/baby-breastfeeding-too-much#write-reply">Continue reading</a>
// 					</p>
// 				</div>
// 			</li><li ng-repeat="post in $ctrl.posts">
// 				<div class="post-list-view content">
// 					<h2 class="h5">
// 						<a ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/30465/trouble-with-bottle-feeding#write-reply">Trouble with bottle-feeding</a>
// 					</h2>
// 					<p class="post-list-body">Our daughter has rejected bottle-feeding thus far, but with my wife returning to work, our plan was for me to stay home and bottle-feed. I'm afraid this plan won't be viable unless she takes to the …</p>
// 					<p class="continue-read">
// 						<a class="btn btn-tertiary" ui-sref="app.forum.post-detail({'post_id' : post.id, 'slug': $ctrl.doSlug(post.title) })" href="/forum/posts/30465/trouble-with-bottle-feeding#write-reply">Continue reading</a>
// 					</p>
// 				</div>
// 			</li>
// 		</ul>
// 	</div>
// </div>
// </forum-recommended-posts>
// 	</section>

// 	<section>
// 		<write-post><div class="center forum-post-cta"><div class="cta-container"><span>Have a question of your own?</span><a class="btn btn-cta" ui-sref="app.forum.create-post" href="/forum/post/create#write-reply">Write a post</a></div></div></write-post>
// 	</section>

// 	<section>
// 		<explore-practitioners user="$ctrl.user"><section ng-if="$ctrl.user.role !== 'practitioner'" class="forum-explore-practitioners" style="">
// 	<article>
// 		<img class="care-team" src="/img/app/forum/explore-practioners/care-team.png" alt="Five headshots of 5 women">
// 		<h2 class="h4 serif">Need an expert's advice, stat?</h2>
// 		<p class="private-msg lg">
// 			Send a private message or video chat with a variety of specialists 24/7 on your own time.
// 		</p>
// 		<a role="button" ui-sref="app.appointment.book" class="btn btn-action talk-practitioner" href="/book#write-reply">Explore practitioners</a>
// 		<p class="not-sure" ng-if="$ctrl.user">
// 			<img width="24" height="24" src="https://d3kteh0pr56dm7.cloudfront.net/rfSZaTGgh3IiXeMWmc9vwOgzvoE=/500x500/smart/https://storage.googleapis.com/maven-prod-images/de6c76ba-3b51-415d-a8ed-a26698d20784" alt="Headshot of care advocate Kaitlyn Hamilton">
// 			Not sure which specialist to talk to?
// 			<send-message btn-type="btn-tertiary" author="$ctrl.user.care_coordinators[0]" btn-cta="Ask Kaitlyn" id="ask-coordinator"><div ng-if="author.role === 'practitioner' &amp;&amp; author.profiles.practitioner.messaging_enabled" class="private-message" style="">
// 	<div class="private-message-container">
// 		<p class="cta"></p>
// 		<p class="btn-container">
// 			<a class="btn btn-tertiary" href="" ng-click="goMessagePrac(author.profiles.practitioner.user_id)">Ask Kaitlyn</a>
// 		</p>
// 		<span>Get a response within 24hrs</span>
// 	</div>
// </div>
// </send-message>
// 		</p>
// 	</article>
// </section>
// </explore-practitioners>
// 	</section>
// </div>
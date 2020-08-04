import React, { Component } from 'react';
import './dash.css'
import herbpic from '../assets/clipart281299.png'
import userpic from '../assets/pngwing.com.png'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
       
	
            <div className="main-content-area" tabIndex="-1">
                {/* ng-if="$ctrl.userrole !== 'enterprise' " */}
                <dashboard-member-standard className="dashboard" user="$ctrl.user" next-appt="$ctrl.nextAppt"><main className="member-standard">
                <section className="welcome full-bgcol">
                    <h1 className="section-title">We've got your back, Lauren!</h1>
                    {/* ng-if="!$ctrl.nextAppt" */}
                    <span className="welcome-message">
                        <p>Get care from our experts.</p>
                    </span>
                    <div className="dash-primary-cards content-container">
                    {/* ng-click="$ctrl.goToReact('/app/book')" */}
                        <Link to="/care" className="dc-card">
                            <svg width="51" height="59" viewBox="0 0 51 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.6024 7.60582e-07L0 10.0939L15.988 58.1495L45.5904 48.0556L29.6024 7.60582e-07Z" fill="#70B3A7"></path>
                                <path d="M28.1221 4.08191L3.51758 12.4401L15.5111 48.6254L40.1157 40.2672L28.1221 4.08191Z" fill="white"></path>
                                <path d="M34.2629 46.1769L23.6694 49.7755L24.4162 52.0284L35.0096 48.4298L34.2629 46.1769Z" fill="#DCE9E2"></path>
                                <path d="M14.1721 25.6283L22.7716 22.7062C23.6219 22.4152 24.5322 22.8759 24.8196 23.7368L26.7958 29.7024C27.0833 30.5633 26.6282 31.4848 25.7778 31.7758L17.1783 34.698C16.3279 34.989 15.4177 34.5283 15.1302 33.6674L13.154 27.7018C12.8666 26.8409 13.3217 25.9072 14.1721 25.6283Z" fill="#0D8570"></path>
                                <path d="M23.334 27.5684L31.8736 29.3144L29.1069 20.9601L23.334 27.5684Z" fill="#0D8570"></path>
                                <path d="M16.9503 13.3213C17.8169 13.3213 18.5193 12.6101 18.5193 11.7329C18.5193 10.8556 17.8169 10.1445 16.9503 10.1445C16.0838 10.1445 15.3813 10.8556 15.3813 11.7329C15.3813 12.6101 16.0838 13.3213 16.9503 13.3213Z" fill="#70B3A7"></path>
                                <path d="M44.1623 21.7725C43.7072 21.7725 43.276 21.5179 43.0724 21.0692C42.7969 20.463 43.0484 19.7354 43.6473 19.4566L47.5278 17.6257C48.1267 17.3347 48.8453 17.6014 49.1208 18.2077C49.3962 18.8139 49.1447 19.5414 48.5459 19.8203L44.6653 21.6512C44.5096 21.7361 44.33 21.7725 44.1623 21.7725Z" fill="#70B3A7"></path>
                                <path d="M49.4676 29.6418C49.3359 29.6418 49.1921 29.6175 49.0604 29.569L45.0361 28.1019C44.4133 27.8715 44.09 27.1804 44.3175 26.5499C44.5451 25.9194 45.2278 25.592 45.8506 25.8224L49.8748 27.2895C50.4976 27.5199 50.821 28.211 50.5935 28.8415C50.4258 29.3265 49.9587 29.6418 49.4676 29.6418Z" fill="#70B3A7"></path>
                                <path d="M40.437 16.4374C40.3053 16.4374 40.1615 16.4132 40.0298 16.3647C39.407 16.1343 39.0836 15.4432 39.3112 14.8127L40.7724 10.7507C40.9999 10.1202 41.6946 9.79285 42.3054 10.0232C42.9282 10.2536 43.2516 10.9447 43.024 11.5752L41.5628 15.6372C41.3832 16.1222 40.9281 16.4374 40.437 16.4374Z" fill="#70B3A7"></path>
                            </svg>
                            <div className="title">
                                Book a video visit
                            </div>
                        </Link>
                        {/* ng-click="$ctrl.goToReact('/app/select-practitioner?prescribe=true&amp;show_prescribers=true')"  */}
                        <Link to="/remedy-finder" href="" className="dc-card">
                            <img className="iconpic" src={herbpic} alt="herb icon"/>
                            <div className="title">
                                Search for remedies
                            </div>
                        </Link>
                        {/* ng-click="$ctrl.goToReact('/app/select-practitioner?show_prescribers=true&amp;term=coronavirus%20support&amp;vids=18%2C19%2C23%2C25%2C26%2C40%2C49%2C55%2C22%2C31%2C13%2C20')" */}
                        <Link to="/community" className="dc-card">
                            {/* <img className="chatpic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlPSpZZ3gFN9vVuQz5XVi7zdTfR01nTJD0kQ&usqp=CAU"/> */}
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.3412 5.76527H17.7201C14.4053 5.76527 11.2262 7.08209 8.88221 9.42605C6.53826 11.77 5.22144 14.9491 5.22144 18.2639H5.22144C5.22118 20.8078 5.99714 23.2911 7.44566 25.3823C8.89418 27.4734 10.9463 29.0728 13.3279 29.9667V29.9667V36.0687L18.6044 30.8216H32.3412C33.9845 30.8216 35.6117 30.4979 37.1299 29.869C38.6481 29.2402 40.0275 28.3185 41.1895 27.1565C42.3515 25.9945 43.2732 24.615 43.9021 23.0968C44.5309 21.5786 44.8546 19.9514 44.8546 18.3082V18.3082C44.8585 16.6624 44.5377 15.032 43.9106 13.5104C43.2834 11.9888 42.3623 10.6059 41.2 9.44078C40.0376 8.27568 38.6568 7.35131 37.1367 6.72061C35.6166 6.08991 33.987 5.76527 32.3412 5.76527V5.76527Z" fill="#FFD58A"></path>
                                <path d="M34.0656 34.5211H49.571C52.0767 34.5211 54.4798 35.5165 56.2516 37.2882C58.0234 39.06 59.0187 41.4631 59.0187 43.9688V43.9688C59.0213 45.8904 58.4369 47.7669 57.3438 49.3473C56.2507 50.9277 54.701 52.1366 52.9021 52.8122V52.8122V57.3518L48.9078 53.3575H34.0656C31.5599 53.3575 29.1569 52.3621 27.3851 50.5903C25.6133 48.8186 24.6179 46.4155 24.6179 43.9098V43.9098C24.6335 41.4144 25.6357 39.0264 27.4058 37.2674C29.1759 35.5083 31.5701 34.521 34.0656 34.5211Z" fill="#DCE9E2"></path>
                                <path d="M14.8904 19.7378L16.4822 18.2639C16.685 18.0762 16.9283 17.9377 17.1932 17.8593C17.4582 17.7808 17.7377 17.7644 18.01 17.8115C18.2823 17.8585 18.54 17.9677 18.7633 18.1305C18.9866 18.2933 19.1693 18.5054 19.2973 18.7503C19.4155 18.9769 19.5802 19.1759 19.7806 19.3344C19.9811 19.4928 20.2128 19.6071 20.4605 19.6697C20.7082 19.7324 20.9664 19.7419 21.2181 19.6978C21.4698 19.6536 21.7093 19.5568 21.9209 19.4136L24.3823 17.7186C24.6129 17.5633 24.8761 17.4632 25.1515 17.4259C25.427 17.3886 25.7073 17.4151 25.9709 17.5034C26.2344 17.5918 26.4742 17.7395 26.6715 17.9353C26.8689 18.131 27.0186 18.3696 27.109 18.6324V18.7208C27.198 18.9795 27.3443 19.2147 27.537 19.4088C27.7298 19.6029 27.9639 19.7509 28.222 19.8416C28.48 19.9323 28.7553 19.9635 29.0271 19.9328C29.2989 19.902 29.5602 19.8102 29.7915 19.6641L32.4887 17.9986C32.7267 17.848 32.9964 17.755 33.2766 17.7268C33.5568 17.6986 33.8396 17.736 34.1028 17.8361C34.366 17.9362 34.6022 18.0963 34.7928 18.3036C34.9834 18.5109 35.123 18.7597 35.2007 19.0304V19.1777" stroke="#DB9727" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"></path>
                                <path d="M35.5249 45.4869C36.3552 45.4869 37.0282 44.8138 37.0282 43.9835C37.0282 43.1532 36.3552 42.4802 35.5249 42.4802C34.6946 42.4802 34.0215 43.1532 34.0215 43.9835C34.0215 44.8138 34.6946 45.4869 35.5249 45.4869Z" fill="#0D8570"></path>
                                <path d="M41.8186 45.4869C42.6489 45.4869 43.3219 44.8138 43.3219 43.9835C43.3219 43.1532 42.6489 42.4802 41.8186 42.4802C40.9883 42.4802 40.3152 43.1532 40.3152 43.9835C40.3152 44.8138 40.9883 45.4869 41.8186 45.4869Z" fill="#0D8570"></path>
                                <path d="M48.1118 45.4869C48.9421 45.4869 49.6152 44.8138 49.6152 43.9835C49.6152 43.1532 48.9421 42.4802 48.1118 42.4802C47.2815 42.4802 46.6084 43.1532 46.6084 43.9835C46.6084 44.8138 47.2815 45.4869 48.1118 45.4869Z" fill="#0D8570"></path>
                            </svg>
                            <div className="title comm">
                                Join a community
                            </div>
                        </Link>
            
                        <Link to="/account" className="dc-card">
                            <img className="iconpic" src={userpic} alt="account icon"/>
                            <div className="title">
                                Explore your account
                            </div>
                        </Link>
                    </div>
                </section>
            
                <section className="learn">
                    <div>
                        <h2 className="serif h3">Favorited Remedies</h2>
                        <div className="learn-resources">
                            <a href="/resources/content/article/faqs-coronavirus-and-pregnancy">
                                <div className="learn-resource">
                                    
                                </div>
                            </a>
                            <a href="/resources/content/article/faqs-how-coronavirus-is-impacting-fertility">
                                <div className="learn-resource">
                                   
                    
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            
                <section className="bottom-cta full-bgcol">
                    <div className="content-container">
                        <img className="healthpic" src="https://assets.website-files.com/5bf603f84ae3426101807d56/5cd473d2a1024f5fa8ee3502_HREV-Women-Summit%20V2.png" alt="yoga icon"/>
                        <div className="content">
                            <h2 className="align">Our virtual clinic is open 24/7</h2>
                            <p>We have holistic practitioners in over 20 specialties, ready to help you.</p>
                            {/* ng-click="$ctrl.goToReact('/app/book')" */}
                            <Link to="/appointments"><button className="btn btn-cta">Find a provider</button></Link>
                        </div>
                    </div>
                </section>
            </main>
            </dashboard-member-standard>
            </div>

         );
    }
}
 
export default Dashboard;
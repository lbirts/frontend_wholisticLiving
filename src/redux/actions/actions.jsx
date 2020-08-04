export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES"
export const SIGNUP_USER = "SIGNUP_USER";
export const FAVORITE_HERB = "FAVORITE_HERB"
export const LOAD_PROVIDERS = "LOAD_PROVIDERS"
export const LOAD_SPECIALTIES = "LOAD_SPECIALTIES"
export const SELECT_DATETIME = "SELECT_DATETIME";
export const SELECT_PROVIDER = "SELECT_PROVIDER";
export const ADD_NOTES = "ADD_NOTES";
export const CHANGE_STEPPER = "CHANGE_STEPPER";
export const SELECT_SPECIALTY = "SELECT_SPECIALTY";
export const CHOOSE_POST = "CHOOSE_POST";
export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_USERS = "LOAD_USERS";
export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const LOAD_AVAILABILITY = "LOAD_AVAILABILITY"
export const LOAD_APPOINTMENTS = "LOAD_APPOINTMENTS"
export const ADD_APPOINTMENTS = "ADD_APPOINTMENTS"
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT"
export const LOAD_MESSAGES = "LOAD_MESSAGES";
export const LOAD_CHATROOMS = "LOAD_CHATROOMS";
export const ADD_CHATROOM = "ADD_CHATROOM";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const LOAD_CLIENTS = "LOAD_CLIENTS";
export const ADD_COMMENT = "ADD_COMMENT"

export function loginUser(user) {
    return { type: LOGIN_USER, user: user};
}

export function logoutUser() {
    return { type: LOGOUT_USER};
}

export function favoriteHerb(herb) {
    return { type: FAVORITE_HERB, herb: herb}
}

export function loadCategories(categories) {
    return { type: LOAD_CATEGORIES, categories: categories}
}

export function loadProviders(providers) {
    return { type: LOAD_PROVIDERS, providers: providers}
}

export function loadSpecialties(specialties) {
    return { type: LOAD_SPECIALTIES, specialties: specialties}
}

export function selectSpecialty(specialty) {
    return { type: SELECT_SPECIALTY, specialty: specialty}
}

export function selectProvider(provider) {
    return { type: SELECT_PROVIDER, provider: provider}
}

export function selectDatetime(datetime) {
    return { type: SELECT_DATETIME, date_time: datetime}
}

export function changeStepper(step) {
    return { type: CHANGE_STEPPER, step: step}
}

export function addNotes(notes) {
    return { type: ADD_NOTES, notes: notes}
}

export function loadPosts(posts) {
    return { type: LOAD_POSTS, posts: posts}
}

export function loadUsers(users) {
    return { type: LOAD_USERS, users: users}
}

export function choosePost(post) {
    return { type: CHOOSE_POST, post: post}
}

export function loadComments(comments) {
    return { type: LOAD_COMMENTS, comments: comments}
}

export function loadAvailability(availablities) {
    return { type: LOAD_AVAILABILITY, availability: availablities}
}

export function loadAppointments(appointments) {
    return { type: LOAD_APPOINTMENTS, appointments: appointments}
}

export function AddAppointments(appointment) {
    return { type: ADD_APPOINTMENTS, appointment: appointment}
}

export function deleteAppointment(appointment) {
    return { type: DELETE_APPOINTMENT, appointment: appointment}
}

export function loadMessages(messages) {
    return { type: LOAD_MESSAGES, messages: messages}
}

export function loadChatRooms(chatrooms) {
    return { type: LOAD_CHATROOMS, chatrooms: chatrooms}
}

export function addChatRoom(chatroom) {
    return { type: ADD_CHATROOM, chatroom: chatroom}
}

export function addMessage(message) {
    return { type: ADD_MESSAGE, message: message}
}

export function addComment(comment) {
    return { type: ADD_COMMENT, comment: comment}
}

export function loadClients(clients) {
    return { type: LOAD_CLIENTS, clients: clients}
}

export function signupUser(user) {
    return { type: SIGNUP_USER, user: user};
}
  
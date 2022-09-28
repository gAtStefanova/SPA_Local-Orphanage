import { del, get, post, put } from "./api.js";

export async function getAllPosts() {
    return get("/data/posts?sortBy=_createdOn%20desc");
  }
  export async function createPost(postToCreate) {
    return post("/data/posts", postToCreate);
  }

  export async function getPostById(id) {
    return get("/data/posts/" + id);
  }
  export async function deletePost(id){
    return del('/data/posts/'+id)
}
export async function uptadePost(id,postToUpdate){
    return put('/data/posts/'+id,postToUpdate)
}
export async function getPostsByUser(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


export async function donation(postId){
    return post('/data/donations',{
        postId
    })
}
export async function getDonationByPostId(postId){
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`)
}
export async function getMyDonationsByPostId(postId,userId){
    return get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

/*

export async function getBookByUser(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}








*/
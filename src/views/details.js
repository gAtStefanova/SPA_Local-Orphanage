import {  deletePost,  
  donation,  
  getDonationByPostId,
  getMyDonationsByPostId,
  getPostById,
} from "../api/posts.js";

import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  post,
  isOwner,
  onDelete,
  donations,
  showDonationBtn,
  onDonate
) => html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${
                          post.imageUrl
                        } alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">Description: ${
                          post.description
                        }</p>
                        <p class="post-address">Address: ${post.address}</p>
                        <p class="post-number">Phone number: ${post.phone}</p>
                        <p class="donate-Item">Donate Materials: ${donations}</p>

                        <!--Edit and Delete are only for creator-->
                        ${
                          isOwner
                            ? html`<div class="btns">
                                <a href="/edit/${post._id}" class="edit-btn btn"
                                  >Edit</a
                                >
                                <a @click=${onDelete} class="delete-btn btn"
                                  >Delete</a
                                >
                              </div> `
                            : ""
                        }
                        

                        ${
                          showDonationBtn
                            ? html`
                                <!--Bonus - Only for logged-in users ( not authors )-->
                                <a
                                  href="javascript:void(0)"
                                  @click=${onDonate}
                                  class="donate-btn btn"
                                  >Donate</a
                                >
                              `
                            : ""
                        }
                           
                        </div>

                    </div>
                </div>
            </div>
        </section>`;

export async function detailsView(ctx) {
  const userData = getUserData();

  const [post, donations, hasDonated] = await Promise.all([
    getPostById(ctx.params.id),
    getDonationByPostId(ctx.params.id),
    userData ? getMyDonationsByPostId(ctx.params.id, userData.id) : 0,
  ]);
  console.log(post, donations, hasDonated);
  const isOwner = userData && userData.id == post._ownerId;
  const showDonationBtn =
    userData != null && isOwner == false && hasDonated == false;
  ctx.render(
    detailsTemplate(
      post,
      isOwner,
      onDelete,
      donations,
      showDonationBtn,
      onDonate
    )
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this post?");

    if (choice) {
      await deletePost(ctx.params.id);
      ctx.page.redirect("/dashboard");
    }
  }
  async function onDonate() {
    ctx.page.redirect("/details/" + ctx.params.id);
        
    await donation(ctx.params.id)
    console.log(await donation(ctx.params.id));

  }
}

# cse-134b-hw5
Assignment 5 for CSE 134B FA19

No longer using a timeout for authentication. Works perfectly now
Everything pretty much works
Only current bugs is when editing a listing. If the name changes, then I lose reference to the image in storage. One possible solution is to delete image and then add the image again with the correct name. Or Have a data field that keeps the original name. Was having issues with the latter. Also if you edit the picture and the name stays the same, you need to refresh the page for the image to update. 







TODO
[x] rewrite firestore to be users > wishlist > data 
[x] code path to go thru user
[x] add to db collection under each user
[x] pull data to put in UL 
[x] pull by grabbing user doc and iterating thru 
[x] take data and put into HTML
[x] add edit and delete buttons for each
[x] hook up edit and delete buttons to existing functions
[ ] style
[x] log out logic
 */ 

 Issues:
 [x] form.reset() not working.
 [ ] currentUser is showing undefined when logging in so I'm writing to the undefined database. Maybe it's an issue since I'm running it localhost. Will look into it when I have time.
 [ ] when I click upload image on the form it doesn't prompt me to select an image. So right now I didn't create an image tag to go along with the rest of the info that is displayed to user.

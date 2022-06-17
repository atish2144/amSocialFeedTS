1] Auth
1) Register
Method : POST
Url: http://localhost:8080/auth/register

Payload
{
"name":"Navin kumar" ,
"email":"navink@gmail.com",
"password":"Navin@123"
}

2) Login
Method : POST
Url: http://localhost:8080/auth/login

Payload
{
"email":"navink@gmail.com",
"password":"Navin@123"
}

3) Forgot Password
Method : POST
Url: http://localhost:8080/auth/forgot-password

Payload
{
"email":"navink@gmail.com",
}

 tip-take token from gmail

4) Reset Password
Method : POST
Url: http://localhost:8080/auth/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjdkZmI0YTRlYjUwMGFjOTcxYjU4MjQiLCJpYXQiOjE2NTI3NjE1NjEsImV4cCI6MTY1Mjc2NTE2MSwidHlwZSI6InJlc2V0UGFzc3dvcmQifQ._SHFxI7Xj_nKGVxNC83w9VFaGpGx2vibXmUQVJiBsOU

tip-take token from gmail

Payload
{
"password":"NavinKumar@1111"
}

5) Send Verification  Email
Method : POST
Url: http://localhost:8080/auth/send-verification-email

tip-take token from gmail

Payload
{
"email":"navin@gmail.com"
}

6) Verify Email
Method : POST
Url: http://localhost:8080/auth/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjdkZmI0YTRlYjUwMGFjOTcxYjU4MjQiLCJpYXQiOjE2NTI3Nzk5NTMsImV4cCI6MTY1Mjc4MzU1MywidHlwZSI6InZlcmlmeUVtYWlsIn0.7GZNC0yU89jlK4tNT8CwurqbOPv0CyAzJLFql8TtdYs

tip- take token from gmail
Payload
{
"password":"NavinKumar@1111"


}



2] User
1) Register
Method : POST
Url: http://localhost:8080/users/
Payload
{
"name":"tushar gandhile",
"email":"tusharG@gmail.com",
"password":"Tushar@123"
}

2) Get All
Method : GET
Url: http://localhost:8080/users/

3) Get Single User
Method : GET
Url: http://localhost:8080/users/627ce00630c1b0a588913e68

4) Update User
Method : PATCH
Url: http://localhost:8080/users/62836e99391eb99f15510e13
(Tip use form data)
Payload
{
"name": "navin1 kumar",
"bio": "okay navin",
"mobile":"8899652030"
,"gender": "Male",
"DateOfBirth":"20-05-1997"
}


5)update profileimage
Method : PATCH
Url:http://localhost:8080/users/profile-picture/62960765a4bd6b24bb9a1d68
(Tip use form data)
Payload
{ 
Image:”image”
}

3] Feed
1) Add one feed
Method : POST
Url: http://localhost:8080/feeds
(Tip use form data)
Payload
{
"caption":"tushar",
“Image”:”all image”
}

2) Get All Feed
Method : GET
Url: http://localhost:8080/feeds

3) Like Feed
Method : PATCH
in param feed id
Url: http://localhost:8080/feeds/like/6295e6e3ae9b7638bdad5b85
no data pass only token


4) Comment Feed
Method : PATCH
in param feed id 
Url:-
http://localhost:8080/feeds/comment/6296089ba4bd6b24bb9a1d74
(Tip use form data)
Payload
{
"comment":"its good"
}

5) Bookmark Feed
Method : GET
in param feed id 
Url:-
http://localhost:8080/feeds/savefeed/6295e6e3ae9b7638bdad5b85


6) Like Comment Feed
Method : PATCH
in param pass feed id ,comment id
Url:-
http://localhost:8080/feeds/likecomment/6296089ba4bd6b24bb9a1d74/629854988aba6fa936b515f7

7) Comment  reply Feed
Method : PATCH
in param feed id ,comment id
Url:-
http://localhost:8080/feeds/comment-reply/6296089ba4bd6b24bb9a1d74/62984823bcac4dbfc0d4f88a
(Tip use form data)
Payload
{
"comment":"its good"
}

8) Like reply Comment Feed
Method : PATCH
in param pass feed id ,comment id,reply id
Url:-
http://localhost:8080/feeds/likecomment-reply/6296089ba4bd6b24bb9a1d74/629854988aba6fa936b515f7/6298600db0020f61454477b1

​no data require


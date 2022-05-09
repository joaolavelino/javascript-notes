import Api from "./api";

const NotesService = {
  index: () =>
    Api.get("/notes", {
      headers: { "x-access-token": localStorage.getItem("token") },
      //nesse caso, como precisamos autentificar o usuário na api, passamos o token na header da requisição
    }),
  create: () =>
    //here I'm setting all these default values for the note on this first object.
    Api.post(
      "/notes",
      { title: "New Note", body: "This is a new note..." },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
        //nesse caso, como precisamos autentificar o usuário na api, passamos o token na header da requisição
      }
    ),
  delete: (id) =>
    //here I need an Id  to tell the api which note will be deleted. So I'm sending it on the parameters
    Api.delete(`/notes/${id}`, {
      headers: { "x-access-token": localStorage.getItem("token") },
      //nesse caso, como precisamos autentificar o usuário na api, passamos o token na header da requisição
    }),
  update: (id, params) =>
    //here I need an Id and the new info to tell the api which note will be updated and its new content. So I'm sending them on the parameters
    Api.put(`/notes/${id}`, params, {
      headers: { "x-access-token": localStorage.getItem("token") },
      //nesse caso, como precisamos autentificar o usuário na api, passamos o token na header da requisição
    }),
};

export default NotesService;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9Aam9hby5jb20iLCJpYXQiOjE2NTIxMDY3MzEsImV4cCI6MTY1Mjk3MDczMX0.vruLgcpiGbtK5VZL25k-OJ-YPSdNbWYYTa3-Ug4PEnw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9Aam9hby5jb20iLCJpYXQiOjE2NTIxMDY3MzEsImV4cCI6MTY1Mjk3MDczMX0.vruLgcpiGbtK5VZL25k-OJ-YPSdNbWYYTa3-Ug4PEnw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9Aam9hby5jb20iLCJpYXQiOjE2NTIxMDY3MzEsImV4cCI6MTY1Mjk3MDczMX0.vruLgcpiGbtK5VZL25k-OJ-YPSdNbWYYTa3-Ug4PEnw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9Aam9hby5jb20iLCJpYXQiOjE2NTIxMDY3MzEsImV4cCI6MTY1Mjk3MDczMX0.vruLgcpiGbtK5VZL25k-OJ-YPSdNbWYYTa3-Ug4PEnw

// 626a8a0ec8d0231c3b3fd24a
// 627421b76fb79e19eb3d089f

// local st                              userid 627421b76fb79e19eb3d089f
// old note id 626aad5b5482e159e2a3ea86  author 627421b76fb79e19eb3d089f
// new note id 626aad5b5482e159e2a3ea86  author 627421b76fb79e19eb3d089f

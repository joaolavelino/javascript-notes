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
  search: (query) =>
    //here I need the query that's defined by the header of the request so it's going to appear on the api
    Api.get(`/notes/search?query=${query}`, {
      headers: { "x-access-token": localStorage.getItem("token") },
      //nesse caso, como precisamos autentificar o usuário na api, passamos o token na header da requisição
    }),
};

export default NotesService;

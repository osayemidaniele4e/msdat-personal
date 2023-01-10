<template>
  <div class="d-flex flex-lg-row flex-column gap-2 mt-3">
    <div class="d-flex col-12 col-lg-6 flex-column w-full mr-4">
      <div class="d-flex justify-content-between border rounded mr-4  p-3">
        <b-icon-x-circle></b-icon-x-circle>
        <div class="d-flex justify-content-between">
          <button class="bg-white shadow-sm text-success font-weight-bolder">Upload</button>
          <button class="bg-white shadow-sm text-dark font-weight-bolder">Remove</button>
        </div>
      </div>
      <div class="mt-3">
        <form class="d-flex flex-wrap">
          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="fname">First Name</label>
          <input class="p-3 mr-4 border rounded" type="text" id="fname" placeholder="Jane">
          </div>

          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="lname">Last Name</label>
          <input class="p-3 mr-4 border rounded" type="text" id="lname" placeholder="Doe">
          </div>

          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="email">Email Address</label>
          <input class="p-3 mr-4 border rounded" type="email" id="email" placeholder="janedoe@email.com">
          </div>

          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="org">Organization</label>
          <input class="p-3 mr-4 border rounded" type="text" id="org" placeholder="XYZ Organization">
          </div>

          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="jt">Job Title</label>
          <input class="p-3 mr-4 border rounded" type="text" id="jt" placeholder="Data analyst">
          </div>

          <div class="w-50 d-flex flex-column my-1">
          <label class="form-label" for="location">Location</label>
          <input class="p-3 mr-4 border rounded" type="text" id="location" placeholder="Abuja, Nigeria">
        </div>

        </form>

      </div>
        <div class="mt-5 mr-4">
          <button class="w-100 px-2 py-3" >UPDATE INFORMATION</button>
        </div>
    </div>
    <div  class=" border col-md-4 rounded p-5 h-25">
      <div class="d-flex flex-column mb-3">
     <label for='acctPass'>Account Password</label>
        <input class="border rounded pass px-2" type='password' id="acctPass" value="georgegeorge">
        <span class="mt-1">Strength: Very Good</span>
      </div>
      <button class="w-100 px-2 py-3">CHANGE PASSWORD</button>
    </div>
  </div>
</template>

<script>

export default {

};
</script>

<style>

button{
  border:none;
  background-color:#007D53;
  border-radius: 5px;
  color: #fff;
  font-family: sans-serif;
  font-size: small;
}

button:hover{
  background-color: #00a26c;
}

/* .button{
  background-color: #fff;
  box-shadow: 0 1px 3px 0  rgb(149, 148, 148);
  font-weight: bold;
  font-size: medium;
  font-family: sans-serif;
  font-size: 14px;
  padding: 10px 30px;
  margin: 10px ;
  border-radius: 2px;
} */

.text-success{
  color: #007D53 !important;
}

.button:hover{
  background-color: #faf7f7;
}

input:focus{
  border: none;
}

input::placeholder{
  font-family: sans-serif;
  font-weight: normal;
  font-size: 15px;
  color: #232323;
  opacity: 0.7;
}

input.pass{
  font-size: 30px;
}

label{
  font-family: sans-serif;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 5px;
  color:#5e5e5e;
}

span{
  font-size: small;
  font-family: sans-serif;
  opacity: 0.5;
}

</style>

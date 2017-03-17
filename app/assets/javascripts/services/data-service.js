(function(ng, currentUser) {
  ng.module('BlueMirrorApp').service('DataRequestService', AllDataService);

      function AllDataService($http) {
          function getData(url) {
              return $http({
                  method: 'GET',
                  url: url
              });
          }

          function postData(url, dataObj) {
              return $http({
                  method: 'POST',
                  url: url,
                  dataType: "json",
                  headers: {
                      "content-type": "application/json;charset=utf-8"
                  },
                  data: dataObj
              });
          }

          function postTodo(url, todoObj) {
              return $http({
                 method: 'POST',
                 url: url,
                 dataType: "json",
                 headers: {
                     "content-type": "application/json;charset=utf-8"
                 },
                 data: todoObj
              });
          }

          function patchData(url) {
              return $http({
                 method: 'POST',
                 url: url,
                 dataType: "json",
                 headers: {
                     "content-type": "application/json;charset=utf-8"
                 },
              });
          }



        //   function postScores(url, dataObj) {
        //       return $http({
        //           method: 'POST',
        //           url: url,
        //           dataType: "json",
        //           headers: {
        //               "content-type": "application/json;charset=utf-8"
        //           },
        //           data: dataObj
        //       });
        //   }
          //
        //   function getScores(url) {
        //       return $http({
        //           method: 'GET',
        //           url: url,
        //           dataType: "json",
        //           headers: {
        //               "content-type": "application/json;charset=utf-8"
        //           },
        //       });
        //   }
          //
        //   function loginPost(url, dataObj) {
        //       return $http({
        //           method: 'POST',
        //           url: url,
        //           dataType: "json",
        //           headers: {
        //               "content-type": "application/json;charset=utf-8"
        //           },
        //           data: {
        //               email: dataObj.email,
        //               password: dataObj.password
        //           }
        //       });
        //   }
          //
        //   function putData(url) {
        //       return $http({
        //           method: 'PUT',
        //           url: url
        //       });
        //   }
          //
          function deleteData(url) {
              return $http({
                  method: 'DELETE',
                  url: url,
                  headers: {
                      "content-type": "application/json;charset=utf-8"
                  },
              });
          }

          return {
              get: getData,
              post: postData,
              postTodo: postTodo,
              delete: deleteData,
              patch: patchData
              //   put: putData,
            //   loginPost: loginPost,
            //   postScores: postScores,
            //   getScores: getScores
          };
      }


})(angular, window.currentUser);
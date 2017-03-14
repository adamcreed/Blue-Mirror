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
        //   function deleteData(url, dataObj) {
        //       return $http({
        //           method: 'DELETE',
        //           url: url,
        //           headers: {
        //               "content-type": "application/json;charset=utf-8"
        //           },
        //           data: dataObj
        //       });
        //   }

          return {
              get: getData,
              post: postData
            //   put: putData,
            //   delete: deleteData,
            //   loginPost: loginPost,
            //   postScores: postScores,
            //   getScores: getScores
          };
      }


})(angular, window.currentUser);

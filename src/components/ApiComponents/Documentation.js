import React from "react";
import { useSelector } from "react-redux";
import AceEditor from "react-ace";
import beautify from 'js-beautify';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Info = () => {
  const
    [apiDocumentation, currentEndpoint] = useSelector(({ app }) => [app.apiDocumentation, app.currentEndpoint]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

    console.log(selectedEndpoint, currentEndpoint)

  return (
    <div>
      {selectedEndpoint &&
        <AceEditor
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          width="100%"
          editorProps={{ $blockScrolling: true }}
          showGutter={true}
          highlightActiveLine={true}
          wrapEnabled={true}
          setOptions={{ enableLiveAutocompletion: true }}
          value={`{
          "name": "string",
          "surname": "string",
          "userCode": "string",
          "isActive": true,
          "customerRepresentativeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "email": "string",
          "phone": "string",
          "countryCode": "string",
          "passportNo": "string",
          "tckn": "string",
          "cityId": "Unknown Type: ınteger",
          "districtId": "Unknown Type: ınteger",
          "address": "string",
          "isForeignNational": true,
          "isVerifiedEmail": true,
          "isVerifiedPhone": true,
          "taxNumber": "string",
          "taxOffice": "string",
          "isIndividual": true,
          "title": "string",
          "erpCode": "string",
          "paymentSetDefinitionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "workplaceCode": "string",
          "departmentCode": "string",
          "speCode": "string",
          "authCode": "string",
          "projectCode": "string",
          "salesmanCode": "string",
          "busTranCode": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }`
          }
        />
      }
    </div>
  );
};

export default Info;
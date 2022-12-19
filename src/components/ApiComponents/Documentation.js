import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import beautify from 'js-beautify';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { v4 } from "uuid";
import { setRequestBody } from "store/features/app";

const Editor = () => {
  const
    [apiDocumentation, currentEndpoint, content, body] = useSelector(({ app }) => [app.appSlice.apiDocumentation, app.appSlicecurrentEndpoint, app.appSlice.responseContent, app.appSlice.requestBody]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method],
    dispatch = useDispatch(),

    getContentSchema = _content => {
      if (_content?.["$ref"]) {
        const array = _content?.["$ref"]?.split("/"),
          itemArray = apiDocumentation.components.schemas[array?.[array?.length - 1]],
          returnData = {};
        for (const [key, value] of Object.entries(itemArray.properties)) {
          if (value.format)
            returnData[key] = v4();
          else if (value?.["$ref"])
            returnData[key] = getContentSchema(value);
          else returnData[key] = value.type;
        }
        return returnData;
      }
    },

    onBodyChange = _body => {
      dispatch(setRequestBody(typeof _body === "string" ? JSON.parse(_body) : _body))
    }

  useEffect(() => {
    onBodyChange(content && getContentSchema(selectedEndpoint.requestBody.content[content].schema))
  }, [content])

  return (
    <div>
      {selectedEndpoint?.requestBody &&
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
          value={JSON.stringify(body, undefined, 2)}
          onChange={e => onBodyChange(e)}
        />
      }
    </div>
  );
};

export default Editor;
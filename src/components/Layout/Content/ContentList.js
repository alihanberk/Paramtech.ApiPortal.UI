import { Input } from "antd";
import { MenuList } from "components/UIComponents";
import _ from "lodash";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import seacrhIcon from "../../../assets/img/ui-icons/search.svg";

const ContentList = () => {
  const
    intl = useIntl(),
    [sider, loading] = useSelector(({ app }) => {
      const
        { sider } = app,
        loading = sider.list.data?.stateKey ? app[sider.list.data.stateKey]?.loading : false;

      return [sider.list, loading];
    }),
    [filter, setFilter] = React.useState(null),
    [data, setData] = React.useState([]),

    handleChange = value => {
      setFilter(value);
    }

  useEffect(() => {
    if (filter) {
      setFilter(null);
    }
    setData(sider.data);
  }, [sider]);

  useEffect(() => {
    if (sider.data?.list && filter) {
      const
        list = sider.data.list.filter(x => x[sider.searchFields]?.toLowerCase().includes(filter.toLowerCase())),
        _data = _.cloneDeep(data);
      _data.list = list;
      setData(_data);
    }
  }, [filter, sider]);

  return (
    <div>
      <div className="mb-40" >
        <Input disabled={loading} value={filter} onChange={e => handleChange(e.target.value)} prefix={<ReactSVG className="svg-prefix" src={seacrhIcon} />} className="input-type-secondary" placeholder={sider.placeholder && intl.formatMessage({ id: sider.placeholder })} />
      </div>
      <div>
        <MenuList {...{ data: filter ? data : sider.data, }} />
      </div>
    </div>
  )
}

export default ContentList;
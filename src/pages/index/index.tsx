import styles from './index.less';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Collapse, Toast, Modal } from 'antd-mobile';
import { fetchCityData } from '@/services/city-data';

export default function IndexPage() {
  const [cityList, setCityList] = useState<any>([]);
  const [selectCity, setSelectCity] = useState<any>([]);

  useEffect(() => {
    initPageData();
  }, []);

  const initPageData = async () => {
    // 获取城市数据
    let cityData = await fetchCityData();
    setCityList(cityData);
    // 初始化已勾选数据
    let selectData = localStorage.getItem('select_city');
    if (selectData != null && selectData != '') {
      let selectArr = JSON.parse(selectData);
      setSelectCity(selectArr as string[]);
    }
  };

  const handleAboutOnClick = () => {
    Modal.alert({
      title: '隐私保护指引',
      content: (
        <div>
          <br />
          我们<b>不会收集/存储</b>您的行程数据，行程数据只会在<b>本地</b>处理。
          <br />
          <br />
          我们也<b>不会上传/分析</b>您的行程数据，请放心使用。
          <br />
          <br />
          我们的灵感来源于{' '}
          <span
            className={styles.privacy}
            onClick={() => {
              location.href = `https://mp.weixin.qq.com/s/U_Ao8BctwznDe-sKo-Vw9w`;
            }}
          >
            @第一财经
          </span>
          <br />
          <br />
          纪念版页面入口: xingchengka.com
          <br />
          <br />
        </div>
      ),
      onConfirm: () => {
        console.log('Confirmed');
      },
    });
  };

  const handleSaveOnClick = () => {
    if (selectCity.length == 0) {
      Toast.show({
        content: '请先选择行程信息',
        maskClickable: true,
      });
      return;
    }
    let cityText = selectCity.join(', ');
    localStorage.setItem('city_text', cityText);
    location.href = `#/result`;
  };

  const handleResetOnClick = () => {
    setSelectCity([]);
  };

  return (
    <div style={styles.page}>
      <div className={styles.headerBox}>
        <div className={styles.titleBox}>
          <div className={styles.title}>最近三年到达或旅经：</div>
          <div className={styles.desc}>
            已选择 {selectCity.length} 个{' '}
            {selectCity.length > 0 && (
              <span className={styles.reset} onClick={handleResetOnClick}>
                清除
              </span>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <Button size="small" color="success" onClick={handleSaveOnClick}>
            下一步
          </Button>
        </div>
      </div>

      <div className={styles.tip}>
        * 行程信息只会在本地处理{' '}
        <span className={styles.privacy} onClick={handleAboutOnClick}>
          隐私指引
        </span>{' '}
        - xingchengka.com
      </div>

      <Checkbox.Group
        value={selectCity}
        onChange={(val) => {
          //console.log(val);
          setSelectCity(val as string[]);
          let selectData = JSON.stringify(val as string[]);
          //console.log(selectData);
          localStorage.setItem('select_city', selectData);
        }}
      >
        <Collapse>
          {cityList.length > 0 &&
            cityList.map((item: any, i: number) => {
              return (
                <Collapse.Panel key={`province_${i}`} title={item.provinceName}>
                  <div className={styles.cityBox}>
                    {item.citys.map((item_j: any, j: number) => {
                      return (
                        <div key={`city_${j}`} className={styles.cityItem}>
                          <Checkbox
                            style={{
                              '--icon-size': '18px',
                              '--font-size': '14px',
                              '--gap': '6px',
                            }}
                            value={`${item.provinceName}${item_j.cityName}`}
                          >
                            {item_j.cityName}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                </Collapse.Panel>
              );
            })}
        </Collapse>
      </Checkbox.Group>

      <div className={styles.footer_tip}>
        「行程卡纪念版」 - xingchengka.com
      </div>

    </div>
  );
}

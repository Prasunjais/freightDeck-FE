import React, { Component, Fragment } from 'react'
import { Table, Modal, Button } from 'antd';
import { getContractsList, SubmitBid } from '../../services/contractsServices';
import { Spin } from "antd";
import { LoadingOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import { handleErrorResponse } from "../../utils/Request";
import message from "antd/lib/message";
import moment from 'moment';
import './contract.scss';
export default class ContractList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedRowKeys: [], // Check here to configure the default column
      data: [],
      bidContractModal: false,
      biddingAmount: 0,
      contractId: '',
      bidderList: [],
      bidderListModal: false
    };
    this.placeBid = this.placeBid.bind(this)
  }

  componentDidMount = async () => {
    try {

      this.setState({ loading: true })
      let data = await getContractsList(1).then((res) => {
        message.success("Contracts Listed Successfully !");
        this.setState({
          loading: false,
          showRemoveWarning: false,
        });
        return res.data.data;
      }).catch((err) => {
        this.setState({ loading: false });
        const { errorMessage, errors } = handleErrorResponse(err);
        message.error(errorMessage);
      });

      let tableData = [];
      for (let i = 0; i < data.results.length; i++) {
        tableData.push({
          sr: i + 1,
          id: data.results[i]._id,
          contractId: data.results[i].contractId,
          division: data.results[i].division,
          bidStartTime: moment(data.results[i].bidStartTime).format('DD-MM-YYYY'),
          bidEndTime: moment(data.results[i].bidEndTime).format('DD-MM-YYYY'),
          destinationAddressFull: `${data.results[i].destinationAddress.street} ${data.results[i].destinationAddress.city} ${data.results[i].destinationAddress.pincode} ${data.results[i].destinationAddress.state}`,
          goodsDescription: data.results[i].goodsDescription,
          bidInitialAmount: data.results[i].bidInitialAmount,
          LowestBidderName: data.results[i].LowestBid.transporter.fullName,
          LowestBidAmount: data.results[i].LowestBid.bidAmount,
          bidderList: data.results[i].transporterBiddingMapping || []
        });
      }

      this.setState({ data: tableData })
      console.log('data', data);
    } catch (e) {
      message.error(e);
    }
  }

  bidderList = (text, record) => {
    try {
      this.setState({ bidderList: record.bidderList, bidderListModal: true })
    } catch (e) {
      message.error(e);
    }
  }

  placeBid = (text, record) => {
    try {
      this.setState({
        bidContractModal: true,
        contractId: record.id
      })
    } catch (e) {
      message.error(e);
    }
  }

  submitBid = async () => {
    try {
      const { biddingAmount, contractId } = this.state;
      this.setState({ loading: true })
      await SubmitBid(biddingAmount, contractId).then((res) => {
        this.setState({ loading: false });
        window.location.reload(false);
      }).catch((e) => {
        window.location = "/login";
      })
    } catch (e) {
      message.error(e);
    }
  }

  onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  toggleModal = () => {
    const { bidContractModal } = this.state;
    this.setState({
      bidContractModal: !bidContractModal
    })
  }

  toggleBidderModal = () => {
    const { bidderListModal } = this.state;
    this.setState({
      bidderListModal: !bidderListModal
    })
  }
  render() {
    const { selectedRowKeys, data, loading, bidContractModal, biddingAmount, bidderListModal, bidderList } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
      ],
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const columns = [
      {
        title: 'Sr No',
        dataIndex: 'sr',
      },
      {
        title: 'Contract Id',
        dataIndex: 'contractId',
      },
      {
        title: 'Division',
        dataIndex: 'division',
      },
      {
        title: 'Bid Start Time',
        dataIndex: 'bidStartTime',
      },
      {
        title: 'Bid End Time',
        dataIndex: 'bidEndTime',
      },
      {
        title: 'Destination Address',
        dataIndex: 'destinationAddressFull',
      },
      {
        title: 'Goods Description',
        dataIndex: 'goodsDescription',
      },
      {
        title: 'Bid Initial Amount',
        dataIndex: 'bidInitialAmount',
      },
      {
        title: 'Lowest Bidder Amount',
        dataIndex: 'LowestBidAmount',
      },
      {
        title: 'Bidder Name',
        dataIndex: 'LowestBidderName',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <>
            <a className="placebid-btn" onClick={() => this.placeBid(text, record)}>
              <DollarOutlined style={{ "fontSize": "1.5rem" }} />
            </a>
            <a className="placebid-btn" onClick={() => this.bidderList(text, record)}>
              <UserOutlined style={{ "fontSize": "1.5rem" }} />
            </a>
          </>
        ),
      }
    ];

    return (
      <Fragment>
        <Spin indicator={antIcon} spinning={loading}>
          <div className="container-fluid my-5">
            <div className="col-md-12 px-4 ">
              <h2>Contracts List</h2>
            </div>
            <div className="table-wrapper">
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
            </div>
          </div>
          <Modal
            title="Place your Bid"
            style={{ top: 20 }}
            closable={false}
            visible={bidContractModal}
            onOk={() => this.submitBid()}
            onCancel={() => this.toggleModal()}
          >
            <p>Bidding Amount :</p>
            <input type="Text" className="bidAmountInput"
              name="biddingAmount"
              value={biddingAmount}
              onChange={this.onChangeHandler} />
          </Modal>
          <Modal
            title="Bidder List"
            style={{ top: 20 }}
            closable={false}
            cancelText={"Close"}
            visible={bidderListModal}
            onOk={() => this.toggleBidderModal()}
            onCancel={() => this.toggleBidderModal()}
          >
            <ul>
              {bidderList && bidderList.map((data) => {
                return (<li>{data.transporter.fullName}-{data.bidAmount}</li>)
              })}
            </ul>
          </Modal>
        </Spin>
      </Fragment>
    )
  }
}

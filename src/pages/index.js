import React from 'react'
import Layout from '../components/layout'
import { Block, Blockchain } from '../Blockchain'

const blockStyle = {
  background: "#fff",
  border: "1px solid #999",
  lineHeight: "15px",
  padding: "5px",
  marginTop: "10px",
  textAlign: "center",
  width: "500px",
}

const BlockComponent = (props) => {
  const b = props.block
  return (
    <div style={blockStyle}>
      <p>Timestamp: {b.timestamp}</p>
      <p>Hash: {b.hash}</p>
      <p>Previous Hash: {b.prevHash}</p>
      <p style={{fontWeight: "bold"}}>Data: {b.data}</p>
    </div>
  )
}

class BlockchainComponent extends React.Component {
  constructor() {
    super()
    this.blockChain = new Blockchain()
    
    this.state = {
      chain: this.blockChain.chain
    }

    
  }
  
  handleAddBlock = () => {
    let data = this.dataInput.value.toString()
    this.blockChain.addBlock(new Block(data))

    this.setState({
      chain: this.blockChain.chain
    })
    localStorage.setItem('chain', JSON.stringify(this.blockChain.chain))
    this.dataInput.value = ''
  }

  componentDidMount() {
    if (localStorage.getItem('chain') === null) {

      localStorage.setItem('chain', JSON.stringify(this.blockChain.chain))
      
    } else {

      this.blockChain.chain = JSON.parse(localStorage.getItem('chain'))
      this.setState({
        chain: this.blockChain.chain
      })
    }


    
  }

  render() {

    return (
      <div>
        <div className="chain">
          <input type="text" ref={ input => this.dataInput = input } />
          <button onClick={this.handleAddBlock}>Add new block</button>
          {this.state.chain.slice(0).reverse().map((block, i) => (
            <BlockComponent block={block} key={i}/>
          ))}
        </div>

        
      </div>

    )
  }
}

const IndexPage = () => (
  <div>
    <Layout>
      <BlockchainComponent />
    </Layout>
  </div>

)

export default IndexPage

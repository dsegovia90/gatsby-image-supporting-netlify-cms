import React from 'react'
import Img from 'gatsby-image'

class PreviewCompatibleImage extends React.Component {
  constructor(props) {
    super(props);

    this.image = React.createRef();
    this.state = {
      paddingBottom: 0
    }
  }
  setAspectRatio() {
    if (this.image && this.image.current) {

      const width = this.image.current.naturalWidth;
      const height = this.image.current.naturalHeight;

      console.log(height, width, height / width)

      const paddingBottom = `${height / width * 100}%`;
      console.log(paddingBottom)
      this.setState({
        paddingBottom
      })
    }
  }
  render() {
    const { alt = '', childImageSharp, image } = this.props.imageInfo

    if (!!image && !!image.childImageSharp) {
      return (
        <Img className={this.props.className} style={this.props.style} fluid={image.childImageSharp.fluid} alt={alt} />
      )
    }

    if (!!childImageSharp) {
      return <Img className={this.props.className} style={this.props.style} fluid={childImageSharp.fluid} alt={alt} />
    }

    if (!!this.props.imageInfo && typeof this.props.imageInfo === 'string') {
      return (
        <div className={this.props.className} style={{position: 'relative', overflow: 'hidden', ...this.props.style}}>
          <div style={{width: '100%', paddingBottom: this.state.paddingBottom}}/>
          <img
            onLoad={this.setAspectRatio.bind(this)}
            ref={this.image}
            src={this.props.imageInfo}
            alt={alt}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}/>
        </div>
      )
    }

    return null
  }
}

export default PreviewCompatibleImage
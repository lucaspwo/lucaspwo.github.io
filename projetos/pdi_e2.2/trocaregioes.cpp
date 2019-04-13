#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int, char**){
  Mat imageIn;

  imageIn= imread("bono.png",CV_LOAD_IMAGE_GRAYSCALE);
  if(!imageIn.data)
    cout << "nao abriu bono.png" << endl;

  Mat imageOut = imageIn.clone();

  namedWindow("janela1",WINDOW_AUTOSIZE);

  for(int i=0;i<250;i++){
    for(int j=0;j<300;j++){
      imageOut.at<uchar>(i+250,j+300) = imageIn.at<uchar>(i,j);
    }
  }

  for(int i=0;i<250;i++){
    for(int j=0;j<300;j++){
      imageOut.at<uchar>(i,j) = imageIn.at<uchar>(i+250,j+300);
    }
  }

  for(int i=0;i<250;i++){
    for(int j=300;j<600;j++){
      imageOut.at<uchar>(i+250,j-300) = imageIn.at<uchar>(i,j);
    }
  }
  
  for(int i=0;i<250;i++){
    for(int j=300;j<600;j++){
      imageOut.at<uchar>(i,j) = imageIn.at<uchar>(i+250,j-300);
    }
  }


  imshow("janela1", imageOut);
  // imwrite("resultTrocaregioes.png", imageOut);
  waitKey();
  return 0;
}

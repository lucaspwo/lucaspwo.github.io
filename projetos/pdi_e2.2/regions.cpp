#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int, char**){
  Mat image;
  Vec3b val;
  int xp1, yp1, xp2, yp2;

  image= imread("bono.png",CV_LOAD_IMAGE_GRAYSCALE);
  if(!image.data)
    cout << "nao abriu bono.png" << endl;

  cout << "Insira a coordenada X do ponto P1:" << endl;
  cin >> xp1;
  cout << "Insira a coordenada Y do ponto P1:" << endl;
  cin >> yp1;
  cout << "Insira a coordenada X do ponto P2:" << endl;
  cin >> xp2;
  cout << "Insira a coordenada Y do ponto P2:" << endl;
  cin >> yp2;

  namedWindow("janela",WINDOW_AUTOSIZE);

  if(xp2 < xp1){
    int tmp = xp1;
    xp1 = xp2;
    xp2 = tmp;
  }

  if(yp2 < yp1){
    int tmp = yp1;
    yp1 = yp2;
    yp2 = tmp;
  }

  for(int i=xp1;i<xp2;i++){
    for(int j=yp1;j<yp2;j++){
      image.at<uchar>(i,j)=255 - image.at<uchar>(i,j);
    }
  }
  
  imshow("janela", image);  
  waitKey();
  return 0;
}

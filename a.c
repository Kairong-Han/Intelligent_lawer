#include <stdio.h>

int main()
{
    int a = 1;
    int c = 1;
    switch (a=2)
    {
    case c%1/* constant-expression */:
        /* code */printf("1");
        break;

    default:
    printf("default");
        break;
    }
}